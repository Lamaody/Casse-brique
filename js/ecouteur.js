function toucheAppuyer(evt) {
  switch(evt.key) {
    case 'r' :
      theGame.restart();
      break;
	case 'p' :
      theGame.pause();
      break;
  }
}
function handleVisibilityChange() {
  if (document.hidden) {
    theGame.pause();
  } else  {
    theGame.pause();
  }
}
	
function addEcouteurs() {
  canvas.addEventListener('mousemove', theGame.deplacer);
  window.addEventListener('keydown', toucheAppuyer);		
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
}  