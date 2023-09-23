import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDoc, collection, doc } from 'firebase/firestore'
import {db } from "../config/firebase"

export default function Problem() {
	const params = useParams()
	const [problem, setProblem] = useState({})
	useEffect(() => {
		const collectData = async () => {
			const problemRef = doc(db, "problems", params.problemId);
			const problem = await getDoc(problemRef)
			setProblem({...problem.data(), id:problem.id})
		}
		collectData()
	},[])
	return (
		<div>
			{problem.p}
			<h1>{problem.title}	</h1>
			<p>{problem.description}</p>
			<code>{problem.code}</code>
			<p>{problem.extraInfo}</p>
			<p>Rating: {problem.rating}</p>
			{/* hello */}
		</div>
	)
}
