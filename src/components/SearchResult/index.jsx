import React, { useEffect, useState, useRef } from 'react';
import data from '../../services/data';

import './style.css';
import { transformData, filterData } from './utils';

function SearchResult({
	navigationDirection,
	resetNavigationDirection,
	searchQuery
}) {

	const [records, setRecords] = useState(null)
	const [activeItem, setActiveItem] = useState(-1)
	const resultRef = useRef(null)

	useEffect(() => {
		if (navigationDirection) {
			let next;
			if (navigationDirection === 'UP') {
				next = (activeItem + records.length - 1) % records.length
			} else {
				next = (activeItem + 1) % records.length
			}
			resultRef.current.scrollTo({
				top: resultRef.current.children[next].offsetTop - 50,
				behavior: 'smooth'
			})
			setActiveItem(next);
			resetNavigationDirection("");
		}
	}, [navigationDirection, records])

	useEffect(() => {
		if (records === null || records.length === 0) {
			setActiveItem(-1);
		} else if (records.length) {
			setActiveItem(0);
			resultRef.current.scrollTo({
				top: resultRef.current.children[0].offsetTop - 50
			})
		}
	}, [records])

	useEffect(() => {
		if (searchQuery.trim() === '') {
			return setRecords(null)
		}
		const transformed = data.filter(filterData(searchQuery)).map(transformData(searchQuery));
		setRecords(transformed)
	}, [searchQuery])


	return records ? (
		<div className="results" ref={resultRef}>
			{
				records.map((record, index) =>
					<div onMouseMove={() => setActiveItem(index)} className={`result ${index === activeItem ? 'result-active' : ''}`} key={record.id}>
						{record.__id ?
							<div className="result_id" dangerouslySetInnerHTML={{ __html: record.__id }} /> :
							<div className="result_id">{record.id}</div>
						}
						{record.__name ?
							<div className="result_name" dangerouslySetInnerHTML={{ __html: record.__name }} /> :
							<div className="result_name">{record.name}</div>
						}
						{record.foundInItems && <div>"{searchQuery}" found in items</div>}
						{record.__address ?
							<div dangerouslySetInnerHTML={{ __html: record.__address }} /> :
							<div>{record.address}</div>
						}
						{record.__pincode ?
							<div dangerouslySetInnerHTML={{ __html: record.__pincode }} /> :
							<div>{record.pincode}</div>
						}
					</div>
				)
			}
			{!records.length && "No Records Found"}
		</div>
	) : null
}

export default SearchResult;
