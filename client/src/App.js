import React from "react";
import { useState } from "react";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
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

	// Create a new post reference with an auto-generated id
	// 고유키 생성 및 데이터 추가 함수
	const createData = () => {
		const db = getDatabase();
		const dbRef = ref(db, "user/child");
		const newdbRef = push(dbRef);
		set(newdbRef, {
			city: "test",
			test: "test",
		});
	};

	// console에 찍히게
	onValue(
		ref(db, "user"),
		(snapshot) => {
			const data = snapshot.val();
			const postReference = snapshot.ref;
			const postId = snapshot.key;
			console.log("~~~", data);
			//updateStarCount(postElement, data);
		}
		//? 한번만 읽기
		//? { onlyOnce: true }
	);

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
				<input type="button" value="수정하기" onClick={createData} />
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
