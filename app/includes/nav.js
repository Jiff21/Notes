/**********************************************************************
* Include for the header using AJAX.  Hold till you know enough BE.
***********************************************************************/

$.ajax({
  url: '/imports/nav.html',
  // data: data,
  error: function(error) {
  	 console.log('ERROR No Nav Data', error);
  },

  success: function(fileData) {
	console.log('OUR Nav Data ', fileData);
	$('.navPlaceholder').html(fileData);
  },

  dataType: 'html'

});

/**********************************************************************
* If you absolutely had to use Javascript this is a hacky fix.
***********************************************************************/

// document.write('<div class="navbar navbar-default navbar-fixed-top" role="navigation">');
// document.write('<div class="container">');
// document.write('<div class="navbar-header">');
// document.write('<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">');
// document.write('<span class="sr-only">Toggle navigation</span>');
// document.write('<span class="icon-bar"></span>');
// document.write('<span class="icon-bar"></span>');
// document.write('<span class="icon-bar"></span>');
// document.write('</button>');
// document.write("<a class='navbar-brand' href='home.html'><img src='/images/HeaderIcon.png'>Jiff's Notes</a>");
// document.write('</div>');
// document.write('<div class="navbar-collapse collapse">');
// document.write('<ul class="nav navbar-nav navbar-right">');
// document.write('<li class="active"><a href="/home.html">Home</a></li>');
// document.write('<li class="dropdown">');
// document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown">Front End<span class="caret"></span></a>');
// document.write('<ul class="dropdown-menu" role="menu">');
// document.write('<li><a href="/html.html">HTML</a></li>');
// document.write('<li><a href="/javascript.html">Javascript</a></li>');
// document.write('<li><a href="/css.html">CSS</a></li>');
// document.write('<li><a href="/sass.html">SASS</a></li>');
// document.write('</ul>');
// document.write('</li>');
// document.write('<li class="dropdown">')
// document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown">Back End<span class="caret"></span></a>');
// document.write('<ul class="dropdown-menu" role="menu">');
// document.write('<li><a href="/php.html">PHP</a></li>');
// document.write('<li><a href="/mysql.html">MySQL</a></li>');
// document.write('</ul>');
// document.write('</li>');
// document.write('<li class="dropdown">');
// document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown">QA<span class="caret"></span></a>');
// document.write('<ul class="dropdown-menu" role="menu">');
// document.write('<li><a href="/jasmine.html">Jasmine</a></li>');
// document.write('<li><a href="/selenium.html">Selenium</a></li>');
// document.write('<li><a href="/protractor.html">Protractor</a></li>');
// document.write('<li><a href="/karma.html">Karma</a></li>');
// document.write('</ul>');
// document.write('</li>');
// document.write('<li class="dropdown">');
// document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown">Other<span class="caret"></span></a>');
// document.write('<ul class="dropdown-menu" role="menu">');
// document.write('<li><a href="/git.html">Git</a></li>');
// document.write('<li><a href="/grunt.html">Grunt</a></li>');
// document.write('</ul>');
// document.write('</li>');
// document.write('</ul>');
// document.write('</div><!--/.nav-collapse -->');
// document.write('</div>');
// document.write('</div>');