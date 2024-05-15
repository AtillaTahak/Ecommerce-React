import React from 'react'
import styled from '../styles/navbar.module.css'
import CartItemBasket from './CartItemBasket'
import UserProfile from './UserProfile'
import { useNavigate } from 'react-router-dom'

type Props = {
	children: React.ReactNode,
	title: string
}

const NavBar = (props: Props) => {
	const navigate = useNavigate();


  return (
	<nav className={styled["nav"]}>
		<div className={styled.content}>
			<div className={styled["left"]} onClick={() => navigate(`/`)}>
				<h1>{props.title}</h1>
			</div>
			<div className={styled["center"]}>
				{props.children}
			</div>
			<div className={styled["right"]}>
				<CartItemBasket />
				<UserProfile />
			</div>
		</div>
	</nav>
  )
}

export default NavBar
