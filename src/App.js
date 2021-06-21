import React ,{useEffect,useState }from "react"
import "./App.css"
import {audioBank} from "./components/audioClips"

 
function App(){
// set some volume consts
const[volume,setVolume]= useState(1);
const[recording,setRecording]=useState("");
const[speed,setSpeed]=useState(0.5);

const playRecording = ()=>{

	let index = 0;
	let recordArray = recording.split(" ");

	const interval = setInterval(()=>{
		const audioTag = document.getElementById(recordArray[index]);
		audioTag.volume = volume;
		audioTag.currentTime = 0;
		audioTag.play();
		index++;

	},speed * 600);
	setTimeout(()=>clearInterval(interval),600 * speed * recordArray.length - 1);

}

 return (
 	<div id="drum-machine" className="text-center" >
 	<div name=" drum-pad">
 	<h3>Drum Machine</h3>
 	{/*Display the pressed keys*/} 
<h3 id="display"> {recording} </h3>
{/* 	Map over the audio array and return each element*/} 

{ audioBank.map(clip=>(

<Pad key = {clip.id} clip ={clip} volume ={volume} setRecording={setRecording} />
 ))}
<br/>

<h3>Volume</h3>
<input onChange={(e)=>setVolume(e.target.value)} type="range" step= "0.01" value ={volume} max="1" min ="0" className="w-50" />

<br/>
{/*check if there's a recording*/}
{recording && (
	<>
	<h3>Speed</h3>
	<input onChange={(e)=>setSpeed(e.target.value)} type="range" step= "0.01" value={speed} max="1.2" min ="0.1" className="w-50" />
	<br/>

	<button onClick={playRecording} className="btn btn-success me-4">Play</button>
	{/*	set the recording to an empty function,thus clear the records*/}	
	<button onClick={()=>setRecording("")} className="btn btn-danger">Clear</button>

	</>

	)
}

 	</div>
 	</div>

 	)
 	}

// access properties passed from the component Pad
function Pad({clip,volume,setRecording}){
	// Declare some vars to enable key animation on press
	const [active ,setActive] = useState(false);
	// Trigger the keys when the user press the keys on their KB

	useEffect(()=>{
		document.addEventListener('keydown',handleKeyPress);
		return ()=>{
			document.removeEventListener('keydown',handleKeyPress);
		};
	// eslint-disable-next-line
	},[]);

	const handleKeyPress =(e)=>{
		if(e.keyCode === clip.keyCode){
			playSound();
		}
	}

	const playSound =()=>{
		const audioTag = document.getElementById(clip.keyTrigger);
		// make the button visually active onkeypress
		setActive(true);
		// set the button active animation to dissapear after 2sec
		setTimeout(()=>setActive(false),200)

		audioTag.currentTime = 0;
		audioTag.volume = volume
		audioTag.play();
		// show all the previously pressed keys
		setRecording(prev=>prev + clip.keyTrigger + " ")

	}
 	return(

 		// Trigger the playSound() onClick,check if button is active,and if false,change the button color 
 		<div onClick={playSound} className={`btn btn-secondary p-4 m-3 ${active && 'btn-warning'}`}>
 			<audio className="clip" id={clip.keyTrigger} src={clip.url}/>
		{/*show text on the divs */} 
		{clip.keyTrigger}
		</div>

 		)

 }

 
export default App;