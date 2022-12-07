import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import {ThirdwebSDK} from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
                                       
const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => { 
  const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-goerli.g.alchemy.com/v2/7MRRjOlg_cNr6t7SJeAw8FmfdNljz_H2'
    )
    return sdk.getNFTModule('0xE05e7B30aeeE0c77176dFaF239f2ef48287B4a40')
  }, [provider])

  useEffect(() => {

    if (!nftModule) return
    ;(async () => {
        const nfts = await nftModule.getAll()

        const selectedNftItem = nfts.find( (nft) => nft.id === router.query.nftId ) 
        setSelectedNft(selectedNftItem)
    })()

  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
        provider.getSigner(),
        'https://eth-goerli.g.alchemy.com/v2/7MRRjOlg_cNr6t7SJeAw8FmfdNljz_H2'
    )
    return sdk.getMarketplaceModule(
        '0x8a71102F88Be5b65fD83b26Ac1dcFE1AC9968390'
    )
  }, [provider])

  useEffect(() => {

    if (!marketPlaceModule) return
    ;(async () => {
        setListings(await marketPlaceModule.getAllListings())
    })()

  }, [marketPlaceModule])




  return (
    <div>
        <Header />
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.topContent}>
                    <div className={style.nftImgContainer}>
                        <NFTImage selectedNft={selectedNft} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nft