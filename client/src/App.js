import React,{useReducer,createContext,useState} from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import Home from './components/buyer_comp/Home'
import Contact from './components/buyer_comp/Contact'
import Profile from './components/buyer_comp/Profile'
import { reducer,initialState } from './components/reducer/UseReducer'
import Cart from './components/buyer_comp/Cart'
import PaymentPage from './components/buyer_comp/PaymentPage'
import RealmeBook from './components/buyer_comp/RealmeBook'
import Realme8s from './components/buyer_comp/Realme8s'
import Dizo from './components/buyer_comp/Dizo'
import Mobiles from './components/buyer_comp/Mobiles'
import Electronics from './components/buyer_comp/Electronics'
import Appliances from './components/buyer_comp/Appliances'
import Men from './components/buyer_comp/Men'
import Women from './components/buyer_comp/Women'
import ViewAll from './components/buyer_comp/ViewAll'
import AddToCart from './components/buyer_comp/AddToCart'
import Error404 from './components/buyer_comp/Error404'

export const UserContext = createContext();

const App = () => {

  const [myobj, setMyObj] = useState(JSON.parse(localStorage.getItem('obj'))===null?{}:JSON.parse(localStorage.getItem('obj')))
  const [state, dispatch] = useReducer(reducer, initialState)
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('cartList'))===null?[]:JSON.parse(localStorage.getItem('cartList'))
  )
  const [orderSummary, setOrderSummary] = useState(
    JSON.parse(localStorage.getItem('orderSummary'))===null?[]:JSON.parse(localStorage.getItem('orderSummary'))
  )
  const [savedLater, setSavedLater] = useState(
    JSON.parse(localStorage.getItem('savedLater'))===null?[]:JSON.parse(localStorage.getItem('savedLater'))
  )
  const [likeList, setLikeList] = useState(
    JSON.parse(localStorage.getItem('likeList'))===null?[]:JSON.parse(localStorage.getItem('likeList'))
  )

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);



  

  

  return (
    <>
     
    <UserContext.Provider value={{
      state,
      dispatch,
      myobj,
      setMyObj,
      cartList,
      setCartList,
      savedLater,
      setSavedLater,
      orderSummary,
      setOrderSummary,
      likeList,
      setLikeList,
      open, 
      setOpen,
      open2, 
      setOpen2
    }}>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/contact'>
          <Contact />
        </Route>
        <Route exact path='/about'>
          <Profile />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/payment'>
          <PaymentPage />
        </Route>
        <Route exact path='/realmebook'>
          <RealmeBook />
        </Route>
        <Route exact path='/realme8s'>
          <Realme8s />
        </Route>
        <Route exact path='/dizo'>
          <Dizo />
        </Route>
        <Route exact path='/mobiles'>
          <Mobiles />
        </Route>
        <Route exact path='/electronics'>
          <Electronics />
        </Route>
        <Route exact path='/appliances'>
          <Appliances />
        </Route>
        <Route exact path='/men'>
          <Men />
        </Route>
        <Route exact path='/women'>
          <Women />
        </Route>
        <Route exact path='/viewall/:path/:text'>
          <ViewAll />
        </Route>
        <Route exact path='/addtocart'>
          <AddToCart />
        </Route>
        <Route>
          <Error404 />
        </Route>
        
      </Switch>
      </UserContext.Provider>
    </>
  )
}

export default App
