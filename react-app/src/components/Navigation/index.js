import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo-home/Vibe-logo.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
				<NavLink exact to="/">
					<img width='175' src={logo} alt=''></img>
				</NavLink>
				<h3 className='flicker'>V I B E</h3>
			{isLoaded && (
					<ProfileButton user={sessionUser} />
			)}
		</div>

	);
}

export default Navigation;
