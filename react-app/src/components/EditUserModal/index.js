import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editUser } from "../../store/session";
import { deleteUserThunk } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./EditUserModal.css";

function EditUserModal({user}) {

	const dispatch = useDispatch();
	const history = useHistory();

	const [email, setEmail] = useState(user.email);
	const [firstName, setFirstName] = useState(user.firstName || '');
	const [lastName, setLastName] = useState(user.lastName || '');
	const [username, setUsername] = useState(user.username);
	const [profilePic, setProfilePic] = useState(user.profilePicUrl || '');
	const [bio, setBio] = useState(user.bio || '');
	const [zodiac, setZodiac] = useState(user.zodiac || 'Rather not say');
	const [height, setHeight] = useState(user.height || '');
	const [relStatus, setRelStatus] = useState(user.relationshipStatus || 'Rather not say');
	const [birthday, setBirthday] = useState(user.birthday || '');
	const [motto, setMotto] = useState(user.motto || '');
	const [cardImg, setCardImg] = useState(user.cardImgUrl || '');
	const [background, setBackground] = useState(user.profileBackgroundImgUrl || '')
	// const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	let userState = useSelector((state) => state.session);
  let userId = userState.user.id;


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (userId) {
			const data = await dispatch(editUser(userId, username, firstName, lastName, email, zodiac, profilePic, bio, height, relStatus, birthday, motto, cardImg, background));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const handleDelete = () => {
		const confirm = window.confirm(
			`Are you sure you wish to delete you're profile? there is no reversing this action but you can always make a new account`
		);
		if (confirm) {
			dispatch(deleteUserThunk(userId)).then(closeModal()).then(() => history.push('/'))
		}
	}

	let zodiacs = ['Rather not say', 'Aquarius', 'Capricorn', 'Sagittarius', 'Scorpio', 'Libra', 'Virgo', 'Leo', 'Cancer', 'Gemini', 'Taurus', 'Aries', 'Pisces']
	let realtionships = ['Rather not say', 'Single', 'Situationship', 'Available', 'In a Relationship', 'Married', "Don't talk to me", 'Divorced', 'Open', "It's Complicated", 'Hopeless Romantic']
	return (
		<>
			<h1>Edit Profile</h1>
			<button onClick={handleDelete}>Delete Profile</button>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					First Name
					<input type='checkbox'></input>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</label>
				<label>
					Last Name
					<input type='checkbox'></input>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Profile Picture Url
					<input
						type="text"
						value={profilePic}
						onChange={(e) => setProfilePic(e.target.value)}
					/>
				</label>
				<label>
					Bio
					<input type='checkbox'></input>
					<textarea
						type="text"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
				</label>
				<label>
					Birth date
					<input type='checkbox'></input>
					<input
						type="date"
						value={birthday}
						onChange={(e) => setBirthday(e.target.value)}
					/>
				</label>
				<label>
					Zodiac Sign
					<input type='checkbox'></input>
					<select value={zodiac} onChange={e => setZodiac(e.target.value)}>
          <option disabled>{'Please select a zodiac'}</option>
          {zodiacs.map(zodiac => (
            <option
              key={zodiac}
              value={zodiac}
            >
              {zodiac}
            </option>
          ))}
        </select>
				</label>
				<label>
					Height
					<input type='checkbox'></input>
					<input
						type="text"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
					/>
				</label>
				<label>
					Motto
					<input type='checkbox'></input>
					<input
						type="text"
						value={motto}
						onChange={(e) => setMotto(e.target.value)}
					/>
				</label>
				<label>
					Card Img Url
					<input type='checkbox'></input>
					<input
						type="text"
						value={cardImg}
						onChange={(e) => setCardImg(e.target.value)}
					/>
				</label>
				<label>
					Relationship Status
					<input type='checkbox'></input>
					<select value={relStatus} onChange={e => setRelStatus(e.target.value)}>
          <option disabled>{'Please select a status'}</option>
          {realtionships.map(relation => (
            <option
              key={relation}
              value={relation}
            >
              {relation}
            </option>
          ))}
        </select>
				</label>
				<label>
					Profile background Img
					<input type='checkbox'></input>
					<input
						type="text"
						value={background}
						onChange={(e) => setBackground(e.target.value)}
					/>
				</label>
				<button type="submit">Save Changes</button>
			</form>
		</>
	);
}

export default EditUserModal;
