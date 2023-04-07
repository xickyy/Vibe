import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editUser } from "../../store/session";
import { deleteUserThunk } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./EditUserModal.css";

function EditUserModal({ user }) {

	const dispatch = useDispatch();
	const history = useHistory();

	const [email, setEmail] = useState(user.email);
	const [firstName, setFirstName] = useState(user.firstName || '');
	const [lastName, setLastName] = useState(user.lastName || '');
	const [username, setUsername] = useState(user.username);
	// const [profilePic, setProfilePic] = useState(user.profilePicUrl || '');
	const [bio, setBio] = useState(user.bio || '');
	const [zodiac, setZodiac] = useState(user.zodiac || 'Rather not say');
	const [height, setHeight] = useState(user.height || '');
	const [relStatus, setRelStatus] = useState(user.relationshipStatus || 'Rather not say');
	const [birthday, setBirthday] = useState(user.birthday || '');
	const [motto, setMotto] = useState(user.motto || '');
	const [cardImg, setCardImg] = useState(user.cardImgUrl || '');
	const [background, setBackground] = useState(user.profileBackgroundImgUrl || '')
	const [textColor, setTextColor] = useState(user.textColor || 'blueviolet')
	const [themeColor, setThemeColor] = useState(user.themeColor || 'aqua')
	const [trimColor, setTrimColor] = useState(user.trimColor || 'blueviolet')

	const [firstNameB, setFirstNameB] = useState(user.booleans.firstNameB || false)
	const [lastNameB, setLastNameB] = useState(user.booleans.lastNameB || false)
	const [bioB, setBioB] = useState(user.booleans.bioB || false)
	const [zodiacB, setZodiacB] = useState(user.booleans.zodiacB || false)
	const [heightB, setHeightB] = useState(user.booleans.heightB || false)
	const [relStatusB, setRelStatusB] = useState(user.booleans.relationshipB || false)
	const [birthdayB, setBirthdayB] = useState(user.booleans.birthdayB || false)
	const [mottoB, setMottoB] = useState(user.booleans.mottoB || false)
	const [cardImgB, setCardImgB] = useState(user.booleans.cardB || false)
	const [backgroundB, setBackgroundB] = useState(user.booleans.backgroundB || false)

	// const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	let userState = useSelector((state) => state.session);
	let userId = userState.user.id;


  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (userId) {
			const data = await dispatch(editUser(userId, username, firstName, firstNameB, lastName, lastNameB, email, zodiac, zodiacB, image, bio, bioB, height, heightB, relStatus, relStatusB, birthday, birthdayB, motto, mottoB, cardImg, cardImgB, background, backgroundB, textColor, themeColor, trimColor));
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
	const colors = ['blueviolet', 'aqua', 'forestgreen', 'black', 'white', 'chartreuse', 'darkmagenta', 'crimson', 'deeppink', 'gold', 'orange', 'lightgrey']

	return (
		<div className="edit-user-modal-container">
			<div className="edit-user-info">
				<h2 className="edit-user-title">Edit Profile</h2>
				<p className="edit-user-info-text">Blue checkmarks indicate weather or not you wish to display that information on your profile.</p>
			</div>
			<form encType="multipart/form-data" className="edit-user-details-container" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="edit-user-labels">
					Email
					<input
						className="edit-user-input-boxes"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="edit-user-labels">
					Username
					<input
						className="edit-user-input-boxes"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className="edit-user-labels">
					Profile Picture Url
					<input
						className="edit-user-input-boxes"
						type="file"
						accept="image/*"
						// value={image}
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</label>
				<label className="edit-user-labels">
					First Name
					<div>
						<input type='checkbox' checked={firstNameB} onChange={() => setFirstNameB(!firstNameB)}></input>
						<input
							className="edit-user-input-boxes"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
				</label>
				<label className="edit-user-labels">
					Last Name
					<div>
						<input type='checkbox' checked={lastNameB} onChange={() => setLastNameB(!lastNameB)}></input>
						<input
							className="edit-user-input-boxes"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
				</label>

				<label className="edit-user-labels">
					Bio
					<div>
						<input type='checkbox' checked={bioB} onChange={() => setBioB(!bioB)}></input>
						<textarea
							className="edit-user-input-text-area"
							type="text"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
						/>
					</div>
				</label>
				<label className="edit-user-labels">
					Relationship Status
					<div>
						<input type='checkbox' checked={relStatusB} onChange={() => setRelStatusB(!relStatusB)}></input>
						<select className="edit-user-input-select" value={relStatus} onChange={e => setRelStatus(e.target.value)}>
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
					</div>
				</label>
				<label className="edit-user-labels">
					Birth date
					<div>
						<input type='checkbox' checked={birthdayB} onChange={() => setBirthdayB(!birthdayB)}></input>
						<input
							className="edit-user-input-date"
							type="date"
							value={birthday}
							onChange={(e) => setBirthday(e.target.value)}
						/>
					</div>
				</label>
				<label className="edit-user-labels">
					Zodiac Sign
					<div>
						<input type='checkbox' checked={zodiacB} onChange={() => setZodiacB(!zodiacB)}></input>
						<select className="edit-user-input-select" value={zodiac} onChange={e => setZodiac(e.target.value)}>
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
					</div>
				</label>
				<label className="edit-user-labels">
					Height
					<div>
						<input type='checkbox' checked={heightB} onChange={() => setHeightB(!heightB)}></input>
						<input
							className="edit-user-input-boxes"
							type="text"
							value={height}
							onChange={(e) => setHeight(e.target.value)}
						/>
					</div>
				</label>
				<label className="edit-user-labels">
					Motto
					<div>
						<input type='checkbox' checked={mottoB} onChange={() => setMottoB(!mottoB)}></input>
						<input
							className="edit-user-input-boxes"
							type="text"
							value={motto}
							onChange={(e) => setMotto(e.target.value)}
						/>
					</div>
				</label>
				<label className="edit-user-labels">
					Card Img Url
					<div>
						<input type='checkbox' checked={cardImgB} onChange={() => setCardImgB(!cardImgB)}></input>
						<input
							className="edit-user-input-boxes"
							type="text"
							value={cardImg}
							onChange={(e) => setCardImg(e.target.value)}
						/>
					</div>
				</label>
				<label className="edit-user-labels">
					Background Img
					<div>
						<input type='checkbox' checked={backgroundB} onChange={() => setBackgroundB(!backgroundB)}></input>
						<input
							className="edit-user-input-boxes"
							type="text"
							value={background}
							onChange={(e) => setBackground(e.target.value)}
						/>
					</div>
				</label>
				<label className="edit-user-labels">
					Text Color
					<div>
						<select className="edit-user-input-select" value={textColor} onChange={e => setTextColor(e.target.value)}>
							<option disabled>{'Please select a color'}</option>
							{colors.map(color => (
								<option
									key={color}
									value={color}
								>
									{color}
								</option>
							))}
						</select>
					</div>
				</label>
				<label className="edit-user-labels">
					Theme Color
					<div>
						<select className="edit-user-input-select" value={themeColor} onChange={e => setThemeColor(e.target.value)}>
							<option disabled>{'Please select a color'}</option>
							{colors.map(color => (
								<option
									key={color}
									value={color}
								>
									{color}
								</option>
							))}
						</select>
					</div>
				</label>
				<label className="edit-user-labels">
					Trim Color
					<div>
						<select className="edit-user-input-select" value={trimColor} onChange={e => setTrimColor(e.target.value)}>
							<option disabled>{'Please select a color'}</option>
							{colors.map(color => (
								<option
									key={color}
									value={color}
								>
									{color}
								</option>
							))}
						</select>
					</div>
				</label>
				<div className="edit-user-save-delete-buttons">
					<button onClick={handleDelete}>Delete Profile</button>
					<button type="submit">Save Changes</button>
				</div>
			</form>
		</div>
	);
}

export default EditUserModal;
