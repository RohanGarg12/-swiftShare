function token() {
  var tokenValue = document.getElementById('input-token').value;  
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if(this.readyState === 4) {
      var jsonObj = JSON.parse(this.responseText);
      if(this.status === 200) {
        document.getElementById('token-content-id').innerHTML = '<a href="/" id="retry-icon"><i class="fa fa-repeat"></i> Another File</a><h2>Here you go!</h2><p>Click on the link to download the file</p><div class="form extramargin"><a id="download" href="' + jsonObj.link +'">' + jsonObj.name + '</a></div>';
      }
      if(this.status === 404) {
        document.getElementById('token-content-id').innerHTML = '<h2>Oops, our bad!</h2><p>The token entered is incorrect or expired.</p><a href="/" id="retry-icon" class="retry-error"><i class="fa fa-repeat"></i> Retry</a>';
      }
    } else 
        document.getElementById('token-content-id').innerHTML = "Working!";
  };
  xhttp.open('POST', '/token/', true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send('token='+tokenValue);
}

// function upload() {
//   var fileValue = document.getElementById('input-file').files[0];
//   var formdata = new FormData();

//   formdata.append('fileInput', fileValue, fileValue.name);

//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if(this.readyState === 4) {
//       var jsonObj = JSON.parse(this.responseText);
//       if(this.status === 200) {
//         document.getElementById('token-content-id').innerHTML = '<a href="/" id="retry-icon"><i class="fa fa-repeat"></i> Another File</a><h2>Here you go!</h2><p>Click on the link to download the file</p><div class="form extramargin"><a id="download" href="' + jsonObj.link +'">' + jsonObj.name + '</a></div>';
//       }
//       if(this.status === 404) {
//         document.getElementById('token-content-id').innerHTML = '<h2>Oops, our bad!</h2><p>The token entered is incorrect or expired.</p><a href="/" id="retry-icon" class="retry-error"><i class="fa fa-repeat"></i> Retry</a>';
//       }
//     } else 
//         document.getElementById('token-content-id').innerHTML = "Working!";
//   }
//   xhttp.open('POST', '/upload/u', true);
//   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhttp.send(formdata);
// }