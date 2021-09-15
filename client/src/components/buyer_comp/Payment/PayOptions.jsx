import React,{useState,useContext} from 'react'
import DoneIcon from '@material-ui/icons/Done';
import {UserStates} from '../PaymentPage'
import GooglePayButton from '@google-pay/button-react'
const PayOption = () => {

    const { payOption, setPayDeliver,setPayLogin,setPayOrder,setPayOption,total} = useContext(UserStates)
    const [email, setEmail] = useState('')
    const [col, setCol] = useState(true)


    const change = () =>{
        setPayDeliver(false) 
        setPayOrder(false)
        setPayLogin(false)
        setPayOption(true)
        setCol(true)
    }
    
    const next = () =>{
        setPayLogin(false)
        setPayDeliver(false)
        setPayOrder(false)
        // setCol(false)
        // setTemp(false)
        // setPayOption(true)
    }

    return (
        <>
            <div className='pay_main'>
                <div className="pay_head" style={{
                            backgroundColor :col && payOption?'#2874f0':'white'
                        }}>
                    <div className='first_div'>
                        <span style={{
                            color:col && payOption?'white':'black'
                        }}>4</span>
                        <div className='second_div'>
                            <span style={{
                                color:col && payOption?'white':'black',
                            }}
                            className='header'>PAYMENT OPTIONS <span className='free' style={{
                                display:payOption || email===''  ?'none':'inline'
                            }}> <DoneIcon fontSize='small'/> </span></span>
                            <span style={{
                                display:payOption || email===''  ?'none':'inline'
                            }}>{}</span>
                        </div>
                    </div>
                    <div className="pay_btn" style={{
                        display:payOption || email==='' ?'none':'flex'
                    }}>
                        <button onClick={change} >change</button>
                    </div>
                </div>
                <div className='pay_body' style={{
                    display:payOption?'block':'none',
                    backgroundColor:'white'
                }}>
                    <div className='option'>

                    
                    <GooglePayButton 
                        environment="TEST"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods:[
                                {
                                    type:'CARD',
                                    parameters:{
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId',
                                        },
                                    },
                                }
                            ],
                            merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: `${total}`,
                                currencyCode: 'INR',
                                countryCode: 'IN',
                            },
                            // shippingAddressRequired: true,
                            callbackIntents: ['PAYMENT_AUTHORIZATION'],
                        }}
                        onLoadPaymentData={paymentRequest => {
                            console.log('Success', paymentRequest);
                        }}
                        onPaymentAuthorized={paymentData => {
                            console.log('payment authorization success',paymentData)
                            return {transactionState:'SUCCESS'}
                        }}
                        existingPaymentMethodRequired='false'
                        buttonColor='white'
                        buttonType='pay'
                    />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PayOption
