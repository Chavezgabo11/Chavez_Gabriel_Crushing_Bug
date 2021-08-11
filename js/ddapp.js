// wrap everything in an IIFE / module
// a module is a JavaScript "pattern" - a programming convention
// this keeps your code private - kinda like a "black box" - which is a best practice

(() => {
    //identify the nodes of interest in the DOM
	const puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
				puzzle = document.querySelector(".puzzle-pieces"),
				dropContainer = document.querySelector(".puzzle-board"),
				topLeft = document.querySelector("#topLeft"),
				topRight = document.querySelector("#topRight"),
				bottomLeft = document.querySelector("#bottomLeft"),
				bottomRight = document.querySelector("#bottomRight"),
				dragImages = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone");

		// functions go in the middle
		function swapImages() {
			// swap out the draggable thumbnail images
			// update the backgound image of the drop zone dropcontainer
			// 1. set the backround image of the dropcontainer
			dropContainer.style.backgroundImage = `url(images/dd/backGround${this.dataset.imageref}.jpg)`;

			// 2. change puzzle pieces backround image of the puzzle image
			console.log(this.dataset.imageref);
			bottomLeft.src = `images/dd/bottomLeft${this.dataset.imageref}.jpg`;
			bottomRight.src = `images/dd/bottomRight${this.dataset.imageref}.jpg`;
			topLeft.src = `images/dd/topLeft${this.dataset.imageref}.jpg`;
			topRight.src = `images/dd/topRight${this.dataset.imageref}.jpg`;
		}


		function reset() {
			var images = dropZones;
			images[0].parentNode.removeChild(images[0]);
			images[1].parentNode.removeChild(images[1]);
			images[2].parentNode.removeChild(images[2]);
			images[3].parentNode.removeChild(images[3]);

			puzzle.innerHTML = '<img id="topLeft" src="images/dd/topLeft0.jpg" alt="top left" class="puzzle-image"><img id="topRight" src="images/dd/topRight0.jpg" alt="top left" class="puzzle-image"><img id="bottomLeft" src="images/dd/bottomLeft0.jpg" alt="top left" class="puzzle-image"><img id="bottomRight" src="images/dd/bottomRight0.jpg" alt="top left" class="puzzle-image">';
			dropContainer.innerHTML = '<!-- these are the drop zones --><div id="topLeft" class="drop-zone"></div><div id="topRight" class="drop-zone"></div><div id="bottomLeft" class="drop-zone"></div><div id="bottomRight" class="drop-zone"></div>';
		}

		function startDrag(event) {
			console.log('dragging ' + this.id);
			//Save reference to element the user is dragging
			//so that we can retrieve the element later and put it in a drop zone
			event.dataTransfer.setData("dragTarget", this.id);

			let puzzleID = this.id;
			//debugger;
		}

		function draggedOver(event) {
			event.preventDefault();
			console.log('dragging over drop zone elements');
		}

		function dropped(event) {
			//allow a drop happen
			event.preventDefault();

			//if we've already droppped and appended into the drop zone, then it shouldn't happen again
			//the return statement is a code-killer - nothing will execute past this line/statement
			//console.log(this);
			if (this.children.length > 0) {return;}

			//get the reference to the dregged image - saved in the drag function using setData
			let targetImage = document.querySelector(`#${event.dataTransfer.getData("dragTarget")}`);

			//console.log(this);
			//add it to the zone we dropped the image on
			console.log(targetImage);
			console.log(this.id);

			if (targetImage.id !== this.id) {
				alert("wrong piece");
			}
			else {
				this.appendChild(targetImage);
				targetImage.style.margin = "0px";
				targetImage.style.padding = "0px";
				targetImage.style.width = "100%";
				targetImage.style.height = "100%";
			}
		}


	// event handling at the bottom
	dragImages.forEach(piece =>	piece.addEventListener('dragstart', startDrag, false));


	dropZones.forEach(zone => {
		zone.addEventListener('drop',dropped, false);
		zone.addEventListener('dragover',draggedOver, false);
	});

	puzzleSelectors.forEach(button => button.addEventListener("click", reset));
	puzzleSelectors.forEach(button => button.addEventListener("click", swapImages));

})();
