<!--#if expr="$environment!=/UAT|PRODUCTION/"-->
    <link rel="stylesheet" href="../css/css.css" />
<!--#elif expr="$environment=UAT"-->
    <link rel="stylesheet" href="$GRUNTCONFIG.environment.staticDomain<!--#echo var='project1css' default=''-->" />
    <link rel="stylesheet" href="$GRUNTCONFIG.environment.staticDomain<!--#echo var='project2css' default=''-->" />
    <link rel="stylesheet" href="$GRUNTCONFIG.environment.staticDomain<!--#echo var='fenginecss' default=''-->" />
<!--#elif expr="$environment=PRODUCTION"-->
    <link rel="stylesheet" href="$GRUNTCONFIG.environment.staticDomain??<!--#echo var='project1css' default=''-->,<!--#echo var='project2css' default=''-->,<!--#echo var='fenginecss' default=''-->" />
<!--#endif -->
