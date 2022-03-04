import React, { useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart,removeFromCart } from "../actions/cartAction";

function CartScreen() {
    const params = useParams();
  const productId = params.id;
  //console.log(window.location.href)
  const qty = window.location.href ? Number(window.location.href.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart=useSelector(state=>state.cart)
  const{cartItems}=cart
  //const qty=3
  /* console.log(qty);
  console.log(productId)
  console.log(cartItems) */
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id))
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate=useNavigate()
  const checkoutHandler=()=>{
    if(!userInfo){
      navigate('/login')
    }
    else
      navigate('/shipping')
  }

  return <div>
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        
        {
          cartItems.length==0?(
            <Message variant='info'>Your cart is empty <Link to='/'>go back</Link></Message>
          ):(
            <ListGroup variant='flush'>
              
              {cartItems.map(item=>(
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.product} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={3}>
                    <Form.Select
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product,e.target.value))}
                        >
                          {[...Array(item.countInStock).keys()].map(
                            (count) => (
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            )
                          )}
                        </Form.Select>
                    </Col>
                    <Col md={1}>
                      <Button type='button'
                        variant='light'
                        onClick={()=>removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                  
                  
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Sub Total ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>
              ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
            </ListGroup.Item>

          </ListGroup>
          <ListGroup.Item>
            <Button type='button' className='btn-block w-100'
              disabled={cartItems.length==0}
              onClick={checkoutHandler}
            >
              Proceed to checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  </div>;
}

export default CartScreen;
