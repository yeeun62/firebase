import React from "react";
import { useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import config from "./config";

function App() {
	const [city, setCity] = useState("");
	const [name, setName] = useState("");
	const [data, setData] = useState();
	const [state, setState] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
	};

	const onChange = (e) => {
		const {
			target: { value, name },
		} = e;
		if (name === "city") {
			setCity(value);
		} else if (name === "name") {
			setName(value);
		}
	};

	const db = getDatabase();

	// handle-log 읽기 함수
	const readData = () => {
		const starCountRef = ref(db, "user");
		onValue(starCountRef, (snapshot) => {
			const logData = snapshot.val();
			setData({ ...data, logData });
			setState(true);
			//updateStarCount(postElement, data);
		});
	};

	// handle-log 수정 & 추가 함수
	const updateData = (city, name) => {
		set(ref(db, "user"), {
			city,
			name,
		});
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="city"
					name="city"
					onChange={(e) => onChange(e)}
				/>
				<br />
				<input
					type="text"
					placeholder="name"
					name="name"
					onChange={(e) => onChange(e)}
				/>
				<br />
				<input type="button" value="읽어오기" onClick={readData} />
				<input
					type="button"
					value="수정하기"
					onClick={() => updateData(city, name)}
				/>
			</form>
			{state && (
				<p>
					{data.logData.city}
					{data.logData.name}
				</p>
			)}
		</div>
	);
}

export default App;
