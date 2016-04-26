<!--#if expr="$environment!=/UAT|PRODUCTION/"-->
    <script type="text/javascript" src="../js/js.js"></script>
<!--#elif expr="$environment=UAT"-->
    <script type="text/javascript" src="$GRUNTCONFIG.environment.staticDomain<!--#echo var='project1js' default=''-->"></script>
    <script type="text/javascript" src="$GRUNTCONFIG.environment.staticDomain<!--#echo var='project2js' default=''-->"></script>
    <script type="text/javascript" src="$GRUNTCONFIG.environment.staticDomain<!--#echo var='fenginejs' default=''-->"></script>
<!--#elif expr="$environment=PRODUCTION"-->
    <script type="text/javascript" src="$GRUNTCONFIG.environment.staticDomain??<!--#echo var='project1js' default=''-->,<!--#echo var='project2js' default=''-->,<!--#echo var='fenginejs' default=''-->"></script>
<!--#endif -->
