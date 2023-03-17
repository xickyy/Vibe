import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from '../SearchBar';
import './Navigation.css';
import logo from './logo-home/Vibe-logo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='Navigation-menu'>
			<NavLink exact to="/">
				<img width='175' src={logo} alt=''></img>
			</NavLink>
			<SearchBar placeholder='Find a Friend!' />
			{isLoaded && (
				<div className='prof-button'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>

	);
}

export default Navigation;
