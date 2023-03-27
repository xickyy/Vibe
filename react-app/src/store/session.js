// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";


const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});


const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const deleteUserThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeUser());
  }
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	console.log('DATAA',username, email, password)
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			first_name: '',
			last_name: '',
			profile_pic_url: '',
			bio: '',
			zodiac: 'Rather not say',
			height: '',
			relationship_status: 'Rather not say',
			birthday: '',
			motto: '',
			card_img_url: '',
			profile_background_img_url: ''
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const editUser = (id, username, firstName, firstNameB, lastName, lastNameB, email, zodiac, zodiacB, profilePic, bio, bioB, height, heightB, relStatus, relStatusB, birthday, birthdayB, motto, mottoB, cardImg, cardImgB, background, backgroundB, textColor, themeColor, trimColor) => async (dispatch) => {
	const response = await fetch(`/api/users/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			first_name: firstName,
			first_name_b: firstNameB,
			last_name: lastName,
			last_name_b: lastNameB,
			email,
			zodiac,
			zodiac_b: zodiacB,
			profile_pic_url: profilePic,
			bio,
			bio_b: bioB,
			height,
			height_b: heightB,
			relationship_status: relStatus,
			relationship_b: relStatusB,
			birthday,
			birthday_b: birthdayB,
			motto,
			motto_b: mottoB,
			card_img_url: cardImg,
			card_b: cardImgB,
			profile_background_img_url: background,
			background_b: backgroundB,
			text_color: textColor,
			theme_color: themeColor,
			trim_color: trimColor
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const demoLogin = () => async (dispatch) => {
  const email = "demo@aa.io";
  const password = "password";
  const response = await fetch("/api/auth/login", {
    method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
