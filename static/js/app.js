//参考: https://blog.addpipe.com/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/

//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
// var pauseButton = document.getElementById("pauseButton");

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
// pauseButton.addEventListener("click", pauseRecording);


function startRecording() {
	console.log("recordButton clicked");

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false,  }

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	recordButton.disabled = true;
	stopButton.disabled = false;
	// pauseButton.disabled = false;

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();

		//update the format 
		// document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record()

		console.log("Recording started");

	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = true;
    	// pauseButton.disabled = true
	});
}

// function pauseRecording(){
// 	console.log("pauseButton clicked rec.recording=",rec.recording );
// 	if (rec.recording){
// 		//pause
// 		rec.stop();
// 		pauseButton.innerHTML="Resume";
// 	}else{
// 		//resume
// 		rec.record()
// 		pauseButton.innerHTML="Pause";

// 	}
// }

function stopRecording() {
	//追加

	//追加終わり


	console.log("stopButton clicked");

	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	// ↓false -> trueに変えた。録音は一回ずつにしたいから。
	recordButton.disabled = true; 
	// pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	// pauseButton.innerHTML="Pause";
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	li.id = "li"
	// var link = document.createElement('a');
	var notice = document.createElement('p')

	//name of .wav file to use during upload and download (without extendion)
	var filename = new Date().toISOString();

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;
	notice.textContent = "Please make sure speech was recorded successfully."

	//save to disk link
	// link.href = url;
	// link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
	// link.innerHTML = "Save to disk";

	//add the new audio element to li
	li.appendChild(au);
	li.appendChild(notice);
	
	//add the filename to the li
	// li.appendChild(document.createTextNode(filename+".wav "))

	//add the save to disk link to li
	// li.appendChild(link);
	
	//upload link
	var submitButton = document.createElement('button');
	submitButton.className = "submit"
	submitButton.id = "submit"
	// このリンクなんとかしたい うまくいかない
	// submitButton.href="#" ; 
	submitButton.textContent = "Submit";

	submitButton.addEventListener("click", function(event){
    /** AJAX */
		// var formData = new FormData();
    // formData.append('audio', blob);
    // $.ajax({
    //   type: "POST",
    //   url: '/',
    //   data: formData,
    //   processData: false,
    // }).done(function(data) {
    //   console.log(data);
    // });

/**FETCH API */
    // fetch(`${window.origin}/`, {method:"POST", body:blob})
    // .then(response => {
    //   if (response.ok) return response;
    //   else throw Error(`Server returned ${response.status}: ${response.statusText}`)
    // })
    // .then(response => console.log(response.text()))
    // .catch(err => {
    //   alert(err);
    // });
/**XMLHttpRequest */
	var xhr=new XMLHttpRequest();
	// xhr.onload=function(e) {
	// 	if(this.readyState === 4) {
	// 	//   console.log("Server returned: ",e.target.responseText);
	// console.log("audio submitted");
	// 	}
	// };
	
// 参考: https://stackoverflow.com/questions/60053443/return-render-template-doesnt-work-xmlhttprequest-flask
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			//document.write(xhr.responseText);
			recordButton.disabled = false
			removedElement = document.getElementById("submit")
			removedElement.remove()
			while (recordingsList.firstChild) {
				recordingsList.removeChild(recordingsList.firstChild);
			  }
			  // document.wirte
			document.head.insertAdjacentHTML("beforeend", xhr.responseText)
		} 
	}
	var fd=new FormData();
	fd.append("audio_data",blob, filename);
	xhr.open("POST","/",true);
	xhr.send(fd);

	// image src変える処理
	
	// const image = document.getElementById('image');
	// console.log(image.src)

	})
	// eventlistner終わり

	li.appendChild(document.createTextNode (" "))//add a space in between
	li.appendChild(submitButton)//add the upload link to li

	//add the li element to the ol
	if(recordingsList.length){
		recordingsList = recordingsList[recordingsList.length-1]
		console.log(recordingsList, typeof(recordingsList))
	}
	console.log("hogehoge", recordingsList, typeof(recordingsList))
	recordingsList.appendChild(li);
	


	// Record Again 追加
	var deleteButton = document.createElement('button')
	deleteButton.textContent = 'Record Again';
    deleteButton.className = 'delete';
	li.appendChild(deleteButton);

  // deleteButton.addEventListener("click", function(event) {
  //   let evtTgt = event.target;
  //   evtTgt.parentNode.parentNode.removechild(evtTgt.parentNode);
  //   recordButton.disabled = false
  // });

	deleteButton.onclick = function(e) {
        let evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        recordButton.disabled = false
      }
}
