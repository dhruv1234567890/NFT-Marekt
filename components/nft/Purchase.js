import { useEffect, useState } from 'react'
import {  HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'

const style = {
    button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
    buttonIcon: `text-xl`,
    buttonText: `ml-2 text-lg font-semibold`
}

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
    const [selectedMarketNft, setSelectedMarketNft] = useState()
    const [enableButton, setEnableButton] = useState(false)

    useEffect(() => {
        if(!listings || isListed === 'false') return
        ;(async () => {
            setSelectedMarketNft(
                listings.find(marketNft => marketNft.asset?.id === selectedNft),
            )
        })()
    }, [selectedNft, listings, isListed])

    useEffect(() => {
        if(!selectedMarketNft || !selectedNft) return
        
        setEnableButton(true)
    }, [selectedMarketNft, selectedNft])


    const confirmPurchase = (toastHandler = toast) =>
        toastHandler.success(`Purchase successful!`, {
            style: {
                background: '#04111d',
                color: '#fff',
            },
        })

    const buyItem = async (
        listingId = selectedMarketNft.id,
        quantityDesired = 1,
        module = marketPlaceModule,
    ) => {
        await module.buyoutDirectListing({ listingId, quantityDesired })

        confirmPurchase()
    }

    return(
        <div className='bg-[#303339] h-20 w-full flex items-center px-12 rounded-lg border-[#151c22] border'>
            <Toaster position='bottom-left' reverseOrder={false} />
            {isListed === 'true' ? (
                <>
                    <div
                        onClick={() => {
                            enableButton ? buyItem(selectedMarketNft.id, 1) : null
                        }}
                        className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
                    >
                        <IoMdWallet className={style.buttonIcon} />
                        <div className={style.buttonText}>Buy Now</div>
                    </div>
                    <div
                        className={`${style.button} border border-[#151c22]`}
                    >
                        <HiTag className={style.buttonIcon} />
                        <div className={style.buttonText}>Make Offer</div>
                    </div>
                </>
            ) : (
                <div  className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
                </div>
            )}
        </div>
    )
}

export default MakeOffer