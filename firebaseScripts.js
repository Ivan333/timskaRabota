(function() {
	var fireTest = function(linkFireBase, linkStudents, linkStudentsData, user_id, firepad_user_id, firepad_user_color, firepadDiv, undoId, redoId, helpId, pixelDataLink, pixSize, currentColor, canvasId, drawBId, clearBId, clearCanvasBId, colorPickerId, currentChoise) {
		if (!(this instanceof fireTest))
			return new fireTest(linkFireBase, linkStudents, linkStudentsData, user_id, firepad_user_id, firepad_user_color, firepadDiv, undoId, redoId, helpId, pixelDataLink, pixSize, currentColor, canvasId, drawBId, clearBId, clearCanvasBId, colorPickerId, currentChoise);
		this.linkFireBase = linkFireBase;
		this.linkStudents = linkStudents;
		this.linkStudentsData = linkStudentsData;
		this.user_id = user_id;
		this.firepadDiv = firepadDiv;
		this.undoId = undoId;
		this.redoId = redoId;
		this.helpId = helpId;
		this.firepad_user_id = firepad_user_id;
		this.firepad_user_color = firepad_user_color;
		this.pixelDataLink = pixelDataLink;
		this.pixSize = pixSize;
		this.currentColor = currentColor;
		this.currentChoise = currentChoise;
		this.canvasId = canvasId;
		this.clearBId = clearBId;
		this.clearCanvasBId = clearCanvasBId;

		var myCanvas = '';
		var pixelDataRef = '';

		this.studentRef = new Firebase(linkStudents);
		this.firepadRef = new Firebase(linkStudentsData + user_id + '/firepad');
		this.userRef = new Firebase(linkStudents + user_id);

		this.child
		this.tmp = new Array();
		this.a = new Array();
		this.o = new Array();
		this.t = new Array();
		this.name = new Array();
		this.user_id
		this.promeni = new Array();

	};

	fireTest.fn = fireTest.prototype = {

		addFirepadd : function(exists) {
			if (exists) {
				this.codeMirror = CodeMirror(this.firepadDiv, {
					lineNumbers : true,
					mode : 'javascript',
					historyEventDelay : 50,
					undoDepth : 10000
				});
				this.firepad = Firepad.fromCodeMirror(this.firepadRef, this.codeMirror, {
					userId : this.firepad_user_id,
					userColor : this.firepad_user_color
				});
				this.textControll();

			}

		},
		textControll : function() {
			var linkStudentsData = this.linkStudentsData;
			var user_id = this.user_id;
			var a = this.a;
			var o = this.o;
			var t = this.t;
			var promeni = this.promeni;
			var name = this.name;
			var tmp = this.tmp;
			var tmpThis = this;
			$(this.undoId).click(function() {
				tmpThis.codeMirror.undoSelection();
				/*var url = linkStudentsData + user_id + '/firepad/history';
				 this.historyRef = new Firebase(url);
				 var ref = this.historyRef;
				 var count = 0;
				 var changes;
				 var test_str;
				 var objekt;
				 ref.on("child_added", function(snap) {
				 count++;
				 objekt = snap;

				 changes = snap.key();

				 });

				 var removeref = new Firebase(linkStudentsData + user_id + '/firepad/history');
				 var test_str = String(objekt.val().o);
				 var start_pos = test_str.indexOf(',') + 1;
				 var end_pos = test_str.indexOf('\"');
				 a.push(objekt.val().a);
				 o.push(objekt.val().o);
				 t.push(objekt.val().t);
				 name.push(objekt.key());

				 var text_to_get = test_str.substr(start_pos);
				 promeni.push(text_to_get);
				 console.log("node", objekt.key());
				 console.log("val", text_to_get);

				 console.log("NIZA", promeni);

				 tmp.push(objekt);
				 console.log("OBJEKTI", tmp);
				 removeref.child(changes).remove();

				 console.log(removeref);
				 $('.firepad').remove();
				 tmpThis.addFirepadd(true);*/
			});

			$(this.redoId).click(function() {
				tmpThis.codeMirror.redoSelection();

				/*
				 var ref = new Firebase(linkStudentsData + user_id + '/firepad/history');
				 // Get the data on a post that has been removed
				 var tmpa = a.pop();
				 var tmpo = o.pop();
				 var tmpt = t.pop();
				 var tmpname = name.pop();

				 ref.child(tmpname).set({
				 a : tmpa,
				 o : tmpo,
				 t : tmpt
				 });
				 tmp.pop();
				 //ref.push(tmp.pop());

				 console.log("POSLE redo", tmp);
				 */
			});
		},

		addDrawCanvas : function() {
			var pixSize = this.pixSize, lastPoint = null, currentColor = this.currentColor, mouseDown = 0;

			//this.pixSize = 2;
			this.pixelDataRef = new Firebase(this.pixelDataLink + this.user_id + '/canvas');
			var pixelDataRef = this.pixelDataRef;

			// Set up our canvas
			this.myCanvas = document.getElementById(this.canvasId);
			var myCanvas = this.myCanvas;

			this.myContext = myCanvas.getContext ? myCanvas.getContext('2d') : null;
			var myContext = this.myContext;

			if (myContext == null) {
				alert("You must use a browser that supports HTML5 Canvas to run this demo.");
				return;
			}

			//Keep track of if the mouse is up or down
			myCanvas.onmousedown = function(e) {
				mouseDown = 1;

			};
			myCanvas.onmouseout = myCanvas.onmouseup = function() {
				mouseDown = 0;
				lastPoint = null;

			};
			this.myContext.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
			//Draw a line from the mouse's last position to its current position

			
			tmp = this;
			var drawLineOnMouseMove = function(e) {

				if (!mouseDown)
					return;

				e.preventDefault();

				// Bresenham's line algorithm. We use this to ensure smooth lines are drawn
				if (tmp.currentChoise == null || (tmp.currentChoise != null && tmp.currentChoise == 'Pencil')) {

					var offset = $('canvas').offset();
					var x1 = Math.floor((e.pageX - offset.left) / pixSize - 1), y1 = Math.floor((e.pageY - offset.top) / pixSize - 1);
					var x0 = (lastPoint == null) ? x1 : lastPoint[0];
					var y0 = (lastPoint == null) ? y1 : lastPoint[1];
					var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
					var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1, err = dx - dy;
					while (true) {
						//write the pixel into Firebase, or if we are drawing white, remove the pixel

						tmp.pixelDataRef.child(x0 + ":" + y0).set(currentColor === "fff" ? null : currentColor);

						if (x0 == x1 && y0 == y1)
							break;
						var e2 = 2 * err;
						if (e2 > -dy) {
							err = err - dy;
							x0 = x0 + sx;
						}
						if (e2 < dx) {
							err = err + dx;
							y0 = y0 + sy;
						}
					}
					lastPoint = [x1, y1];
				}

			};
			var startedRect;
			var x0Rect, y0Rect, xRect, yRect, wRect, hRect;
			var drawRectMouseDown = function(e) {
				//console.log(currentColor);
				if (tmp.currentChoise == 'Rectangle') {
					startedRect = true;
					var offset = $('canvas').offset();
					x0Rect = Math.floor((e.pageX - offset.left));
					y0Rect = Math.floor((e.pageY - offset.top));
					console.log(x0Rect, y0Rect);
				}

			};

			var drawRectMouseMove = function(e) {
				if (tmp.currentChoise == 'Rectangle') {

					if (!startedRect) {
						return;
					}
					var offset = $('canvas').offset();
					xRect = Math.min(Math.floor((e.pageX - offset.left)), x0Rect);
					yRect = Math.min(Math.floor((e.pageY - offset.top)), y0Rect);
					wRect = Math.abs(Math.floor((e.pageX - offset.left)) - x0Rect);
					hRect = Math.abs(Math.floor((e.pageY - offset.top)) - y0Rect);

					//					myContext.clearRect(0, 0, myCanvas.width,myCanvas.height);

					if (!wRect || !hRect) {
						return;
					}
					console.log(xRect, yRect, wRect, hRect);
					/*myContext.fillStyle = currentColor;
					 myContext.rect(xRect, yRect, wRect, hRect);
					 myContext.stroke();*/
				}
			};

			var drawRectMouseUp = function(e) {
				if (tmp.currentChoise == 'Rectangle') {
					if (startedRect) {
					/*
						drawRectMouseMove(e);
						myContext.fillStyle = this.currentColor;
					    myContext.lineWidth = pixSize-1;
					    myContext.strokeStyle = currentColor;
					    myContext.strokeRect(xRect, yRect, wRect, hRect);
						startedRect = false;
					*/
						//write coordinates in firebase
						var tmp1 = 0;
						while(tmp1 <= wRect){
							
							tmp.pixelDataRef.child((tmp1+xRect) + ":" + yRect).set(currentColor === "fff" ? null : currentColor);
							tmp.pixelDataRef.child((tmp1+xRect) + ":" + (yRect+hRect)).set(currentColor === "fff" ? null : currentColor);

							tmp1= tmp1 + pixSize;
						}
						var tmp2 = 0;
						while(tmp2 <= hRect){
							tmp.pixelDataRef.child(xRect + ":" + (yRect+tmp2)).set(currentColor === "fff" ? null : currentColor);
							tmp.pixelDataRef.child((xRect+wRect) + ":" + (yRect+tmp2)).set(currentColor === "fff" ? null : currentColor);

							tmp2= tmp2 + pixSize;
						}
						//zacuvaj vo baza pravoagolnik
						//img_update();
						//tuka treba da se prebrise canvasot i da se dodade ona vo baza sto se zacuvuva
					}
				}
			};

			var startedLine = false;
			var x0Line, y0Line;
			var drawLineMouseDown = function(e) {
				if (tmp.currentChoise == 'Line') {
					startedLine = true;
					var offset = $('canvas').offset();
					x0Line = Math.floor((e.pageX - offset.left));
					y0Line = Math.floor((e.pageY - offset.top));
					console.log(x0Line, y0Line);
				}
			};
			var drawLineMouseMove = function(e) {
				if (tmp.currentChoise == 'Line') {

					if (!startedLine) {

						return;
					}

					//context.clearRect(0, 0, canvas.width, canvas.height);

				}
			};
			var drawLineMouseUp = function(e) {
				if (tmp.currentChoise == 'Line') {
					if (startedLine) {
						drawLineMouseMove(e);
						startedLine = false;
						var offset = $('canvas').offset();
						/*
						myContext.fillStyle = currentColor;
						myContext.fill();
						myContext.beginPath();
						myContext.moveTo(x0Line, y0Line);
						myContext.lineTo(e.pageX - offset.left, e.pageY - offset.top);
						console.log(e.pageX, e.pageY);
						myContext.stroke();
						myContext.closePath();
						*/
						drawMyLine(x0Line,y0Line,e.pageX - offset.left,e.pageY - offset.top);
						
						
					}
				}
			};
			var startedCircle;
			var x0Circle, y0Circle,mouseX,mouseY;
			var drawCircleMouseDown = function(e) {
				if (tmp.currentChoise == 'Circle') {
					startedCircle = true;
					var offset = $('canvas').offset();
					x0Circle = Math.floor((e.pageX - offset.left));
					y0Circle = Math.floor((e.pageY - offset.top));
					mouseX = x0Circle;
					mouseY = y0Circle;
				}
			};
			var drawCircleMouseMove = function(e) {
				if (tmp.currentChoise == 'Circle') {
					if (!startedCircle) {
						return;
					}
					var offset = $('canvas').offset();
					mouseX = parseInt(e.clientX - offset.left);
					mouseY = parseInt(e.clientY - offset.top);
				}
			};
			var drawCircleMouseUp = function(e) {
				if (tmp.currentChoise == 'Circle') {
					if (!startedCircle) {
						return;
					}

					startedCircle = false;
					//myContext.clearRect(0, 0, canvas.width, canvas.height);
					/*
					myContext.beginPath();
					myContext.arc(x0Circle,y0Circle,Math.round(Math.sqrt(Math.pow(x0Circle - mouseX, 2) + Math.pow(y0Circle - mouseY, 2))),0,2*Math.PI);
					myContext.closePath();
					myContext.stroke();
					*/
					var r = Math.round(Math.sqrt(Math.pow(x0Circle - mouseX, 2) + Math.pow(y0Circle - mouseY, 2)));

					if((x0Circle != mouseX && y0Circle != mouseY) || r > 0){
						
					
						var x = r;
						var y = 0;
						var decisionOver2 = 1 - x;   // Decision criterion divided by 2 evaluated at x=r, y=0
						while(x >= y) {
							tmp.pixelDataRef.child((x + x0Circle) + ":" + (y+y0Circle)).set(currentColor === "fff" ? null : currentColor); 
							tmp.pixelDataRef.child((y + x0Circle) + ":" + (x+y0Circle)).set(currentColor === "fff" ? null : currentColor); 
							tmp.pixelDataRef.child((-x + x0Circle) + ":" + (y+y0Circle)).set(currentColor === "fff" ? null : currentColor); 
							tmp.pixelDataRef.child((-y + x0Circle) + ":" + (x+y0Circle)).set(currentColor === "fff" ? null : currentColor); 
							tmp.pixelDataRef.child((-x + x0Circle) + ":" + (-y+y0Circle)).set(currentColor === "fff" ? null : currentColor); 
							tmp.pixelDataRef.child((-y + x0Circle) + ":" + (-x+y0Circle)).set(currentColor === "fff" ? null : currentColor); 
							tmp.pixelDataRef.child((x + x0Circle) + ":" + (-y+y0Circle)).set(currentColor === "fff" ? null : currentColor); 
							tmp.pixelDataRef.child((y + x0Circle) + ":" + (-x+y0Circle)).set(currentColor === "fff" ? null : currentColor);
							y++;
							if (decisionOver2<=0)
							{
								decisionOver2 = decisionOver2 + 2 * y + 1;   // Change in decision criterion for y -> y+1
							}
							else
							{
								x--;
								decisionOver2 = decisionOver2 + 2 * (y - x) + 1;   // Change for y -> y+1, x -> x-1
							}
						}
					}
				}
			};
			
			var drawMyLine = function (x0,y0,x1,y1){
				var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
				var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1, err = dx - dy;
				while (true) {
					//write the pixel into Firebase, or if we are drawing white, remove the pixel

					tmp.pixelDataRef.child(x0 + ":" + y0).set(currentColor === "fff" ? null : currentColor);

					if (x0 == x1 && y0 == y1)
						break;
					var e2 = 2 * err;
					if (e2 > -dy) {
						err = err - dy;
						x0 = x0 + sx;
					}
					if (e2 < dx) {
						err = err + dx;
						y0 = y0 + sy;
					}
				}

			}
			
			$(myCanvas).mousemove(drawLineOnMouseMove);
			$(myCanvas).mousedown(drawLineOnMouseMove);
			$(myCanvas).mousedown(drawRectMouseDown);
			$(myCanvas).mousemove(drawRectMouseMove);
			$(myCanvas).mouseup(drawRectMouseUp);
			$(myCanvas).mousedown(drawLineMouseDown);
			$(myCanvas).mousemove(drawLineMouseMove);
			$(myCanvas).mouseup(drawLineMouseUp);

			$(myCanvas).mousedown(drawCircleMouseDown);
			$(myCanvas).mousemove(drawCircleMouseMove);
			$(myCanvas).mouseup(drawCircleMouseUp);

			// Add callbacks that are fired any time the pixel data changes and adjusts the canvas appropriately.
			// Note that child_added events will be fired for initial pixel data as well.
			this.drawPixel = function(snapshot) {
				var coords = snapshot.key().split(":");
				myContext.fillStyle = "#" + snapshot.val();
				myContext.fillRect(parseInt(coords[0]) * pixSize, parseInt(coords[1]) * pixSize, pixSize, pixSize);
			};
			this.clearPixel = function(snapshot) {
				var coords = snapshot.key().split(":");
				myContext.clearRect(parseInt(coords[0]) * pixSize, parseInt(coords[1]) * pixSize, pixSize, pixSize);
			};
			this.pixelDataRef.on('child_added', this.drawPixel);
			this.pixelDataRef.on('child_changed', this.drawPixel);
			this.pixelDataRef.on('child_removed', this.clearPixel);

			// buttons
			$('#draw').click(function() {
				$('#color-wrapper').css('display', 'block');
				$('#button-wrapper').css('display', 'none');
				$('#firepad-container').css('z-index', '-1');
				$('.firepad').css('z-index', '-1');

				$('#canvas-container').css('z-index', '1');
			});

			$('#code').click(function() {
				$('#color-wrapper').css('display', 'none');
				$('#button-wrapper').css('display', 'block');
				$('#firepad-container').css('z-index', '1');
				$('.firepad').css('z-index', '1');
				$('#canvas-container').css('z-index', '-1');
			});

			$('#clear-canvas').click(function() {
				tmp.pixelDataRef.remove();
			});

			//spectrum
			$("#spectrump-color-picker").spectrum({
				color : "#000",
				showInitial : true
			});
			$("#spectrump-color-picker").change(function() {
				currentColor = $("#spectrump-color-picker").spectrum("get").toHex();
			});
			$("#dtool").change(function() {	
				tmp.currentChoise = $("#dtool option:selected").text();
				//alert(currentChoise);
			});

		},
		detachDraw : function() {
			if (this.pixelDataRef) {
				this.pixelDataRef.off('child_added', this.drawPixel);
				this.pixelDataRef.off('child_changed', this.drawPixel);
				this.pixelDataRef.off('child_removed', this.clearPixel);
			}
		},
		loginUser : function() {
			var ref = new Firebase(this.linkFireBase);

			ref.authAnonymously(function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}
			}, {
				remember : 'sessionOnly'
			});

			var connectedRef = new Firebase(this.linkFireBase + ".info/connected");
			var disconectRef = new Firebase(this.linkStudents + this.user_id + "/online");

			connectedRef.on("value", function(snap) {
				if (snap.val()) {
					disconectRef.onDisconnect().set('');
					disconectRef.set(true);
				}
			});

		},
		initStudent : function() {
			this.loginUser();
			var tmp = this;
			this.studentRef.child(this.user_id).once('value', function(dataSnapshot) {
				if (dataSnapshot.val()) {
					tmp.addFirepadd(true);
				} else {
					alert("user not found!");
				}
			});
			if (this.helpId) {
				$(this.helpId).click(function() {
					tmp.userRef.update({
						help : true
					});
				});
			}
			this.addDrawCanvas();
		},
		initProfessor : function() {
			var tmp = this;
			this.studentRef.child(this.user_id).once('value', function(dataSnapshot) {
				if (dataSnapshot.val()) {
					tmp.addFirepadd(true);
				} else {
					alert("user not found!");
				}
			});

			this.addDrawCanvas();
			$("#dtool")[0].selectedIndex = 0;
		}
	};

	window.fireTest = fireTest;
})();

