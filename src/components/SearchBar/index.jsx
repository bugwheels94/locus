function SearchBar({
	onKeyNavigation=()=>{},
	onChange=()=>{}
}) {
	// Youtube works on key up
	function handleKeyUp(e) {
    if (e.keyCode === 38) {
			onKeyNavigation('UP')
    } else if (e.keyCode === 40) {
			onKeyNavigation('DOWN')
    }
	}
		
	return (
		<input onChange={(e) => onChange(e.target.value)} onKeyUp={handleKeyUp}/>
	);
}

export default SearchBar;
