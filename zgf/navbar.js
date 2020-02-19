//-------------------------------------------------------------------------------

// global variables.
var gCurrPage;
var gFirstPage;
var gLastPage;
var gsFName;


var gsIdxName = null;
var gsBmkName = null;

var gbContents;

var gsTitle = "";
var gsLink = "";
var gsTarget = "";

var gNextImg = new Array;
var gFfwdImg = new Array;
var gRewImg = new Array;
var gPrevImg = new Array;
var gHstFwdImg = new Array;
var gHstBwdImg = new Array;

var gSepImg = new Image;

gNextImg[0] = new Image;
gNextImg[1] = new Image;
gFfwdImg[0] = new Image;
gFfwdImg[1] = new Image;
gRewImg[0] = new Image;
gRewImg[1] = new Image;
gPrevImg[0] = new Image;
gPrevImg[1] = new Image;
gHstFwdImg[0] = new Image;
gHstFwdImg[1] = new Image;
gHstBwdImg[0] = new Image;
gHstBwdImg[1] = new Image;

var gnHstList = new Array;


//-------------------------------------------------------------------------------

function OpenIndex()
{
   parent.contents.location = gsFName + gsIdxName + gsExtName;
}

//-------------------------------------------------------------------------------

function OpenBkmark()
{
   parent.contents.location = gsFName + gsBmkName + gsExtName;
}

//-------------------------------------------------------------------------------

function updateBar(pageNum)
{
   var rewPrevIcon = 0;
   var ffwdNextIcon = 0;
   var hstFwdIcon = 0;
   var hstBwdIcon = 0;

   if(gFirstPage != gLastPage)
   {
      if(pageNum == gFirstPage)
         ffwdNextIcon = 1;
      else if(pageNum == gLastPage)
         rewPrevIcon = 1;
      else if(pageNum > gFirstPage || pageNum < gLastPage)
      {
         rewPrevIcon = 1;
         ffwdNextIcon = 1;
      }
   }

   document.next.src = gNextImg[ffwdNextIcon].src;
   document.ffwd.src = gFfwdImg[ffwdNextIcon].src;
   document.rew.src = gRewImg[rewPrevIcon].src;
   document.prev.src = gPrevImg[rewPrevIcon].src;

   if(gnCurrHstPos > 0)
      hstBwdIcon = 1;
   if(gnHstList[gnCurrHstPos + 1] > 0)
      hstFwdIcon = 1;

   document.hstfwd.src = gHstFwdImg[hstFwdIcon].src;
   document.hstbwd.src = gHstBwdImg[hstBwdIcon].src;
}

//-------------------------------------------------------------------------------

function goHstBwd()
{
   var pageNum;

   if(gnCurrHstPos > 0)
   {
      gnCurrHstPos = gnCurrHstPos - 1;
      pageNum = gnHstList[gnCurrHstPos];

      updatePage(pageNum);
      updateContents(pageNum);
      updateBar(pageNum);
      gCurrPage = pageNum;
   }
}

//-------------------------------------------------------------------------------

function goHstFwd()
{
   var pageNum;

   if(gnHstList[gnCurrHstPos + 1] > 0)
   {
      gnCurrHstPos = gnCurrHstPos + 1;
      pageNum = gnHstList[gnCurrHstPos];

      updatePage(pageNum);
      updateContents(pageNum);
      updateBar(pageNum);
      gCurrPage = pageNum;
   }
}

//-------------------------------------------------------------------------------

function goFirstPage()
{
   openPage(gFirstPage);
}

//-------------------------------------------------------------------------------

function goLastPage()
{
   openPage(gLastPage);
}

//-------------------------------------------------------------------------------

function goPrevPage()
{
   var pageNum = gCurrPage - 1;

   if(pageNum < gFirstPage)
      return;

   openPage(pageNum);
}

//-------------------------------------------------------------------------------

function goNextPage()
{
   var pageNum = gCurrPage + 1;

   if(pageNum > gLastPage)
      return;

   openPage(pageNum);
}

//-------------------------------------------------------------------------------

function openPage(pageNum)
{
   if(pageNum >= gFirstPage && pageNum <= gLastPage)
   {
      gnCurrHstPos = gnCurrHstPos + 1;
      gnHstList[gnCurrHstPos] = pageNum;
      gnHstList[gnCurrHstPos + 1] = 0;

      updatePage(pageNum);
      updateContents(pageNum);
      updateBar(pageNum);
      gCurrPage = pageNum;
   }
}

//-------------------------------------------------------------------------------

function openPage2(pageNum)
{
   if(pageNum >= gFirstPage && pageNum <= gLastPage)
   {
      gnCurrHstPos = gnCurrHstPos + 1;
      gnHstList[gnCurrHstPos] = pageNum;
      gnHstList[gnCurrHstPos + 1] = 0;

      updatePage(pageNum);
      updateBar(pageNum);
      gCurrPage = pageNum;
   }
}

//-------------------------------------------------------------------------------

function updatePage(pageNum)
{
   parent.main.location = gsFName + "_"  + pageNum + gsExtName;
}

//-------------------------------------------------------------------------------

function updateContents(pageNum)
{
   if(gbContents == true)
   {
      if(parent.contents.gsName == "bookmark")
         parent.contents.updateTree(pageNum);
      else if(parent.contents.gsName == "index")
      {
         parent.contents.setIcon(gCurrPage, 0);
         parent.contents.setIcon(pageNum, 1);
      }
   }
}

//-------------------------------------------------------------------------------

function initialize()
{
   var nIconNum;

   if(gFirstPage == gLastPage)
      nIconNum = 0;
   else
      nIconNum = 1;

   // initialize history.
   gnCurrHstPos = 0;
   gnHstList[gnCurrHstPos] = gFirstPage;
   gnHstList[gnCurrHstPos + 1] = 0;

   document.writeln('<table bgcolor="#c0c0c0" cellspacing=0 cellpadding=0 border=0 width="100%">\n<tr>');

   if(gsTitle.length > 0)
   {
      document.writeln('<td>&nbsp;</td>');
      document.write('<td bgcolor="#000000">');
   }
   else
      document.write('<td>&nbsp;');

   document.write('<img src="' + gSepImg.src + '" border=0 width=4 height=25>');

   document.write('<a href="#" onClick="JavaScript:goFirstPage(); return false"><img src="' + gRewImg[0].src + '" name="rew" border=0 width=25 height=25 alt="First Page"></a>');
   document.write('<a href="#" onClick="JavaScript:goPrevPage(); return false"><img src="' + gPrevImg[0].src + '" border=0 width=23 height=25 name="prev" alt="Previous Page"></a>');
   document.write('<a href="#" onClick="JavaScript:goNextPage(); return false"><img src="' + gNextImg[nIconNum].src + '" border=0 width=23 height=25 name="next" alt="Next Page"></a>');
   document.write('<a href="#" onClick="JavaScript:goLastPage(); return false"><img src="' + gFfwdImg[nIconNum].src + '" border=0 width=25 height=25 name="ffwd" alt="Last Page"></a>');

   document.write('<img src="' + gSepImg.src + '" border=0 width=4 height=25>');

   document.write('<a href="#" onClick="goHstBwd(); return false"><img src="' + gHstBwdImg[0].src + '" border=0 width=25 height=25 name="hstbwd" alt="Go to Previous View"></a>');
   document.write('<a href="#" onClick="goHstFwd(); return false"><img src="' + gHstFwdImg[0].src + '" border=0 width=25 height=25 name="hstfwd" alt="Go to Next View"></a>');

   document.writeln('<img src="' + gSepImg.src + '" border=0 width=4 height=25></td>');

   if(gsTitle.length > 0)
   {
      document.writeln('<td bgcolor="#000000" align="right">');

      if(gsLink.length > 0)
      {
         document.write('<a href="' + gsLink + '"');

         if(gsTarget.length > 0)
            document.write(' target="' + gsTarget + '">');
         else
            document.write(' target="_blank">');
      }

      document.write('<b><font color="gold" size=2 face="Helvetica">' + gsTitle + '</b>');

      if(gsLink.length > 0)
         document.write('</a>');

      document.writeln('</td><td bgcolor="black">&nbsp;&nbsp;</td>');
   }

   document.writeln('<td>&nbsp;</td></tr></table><br>');

   if(gsIdxName != null && gsBmkName != null)
   {
      document.writeln('<table width=200><tr>')
      document.write('<td style="font-size:8pt;font-family:Verdana">&nbsp;&nbsp;&nbsp;');
      document.write('<a href="#" onClick="JavaScript:OpenIndex(); return false">page index</a>');
      document.write(' | ');
      document.write('<a href="#" onClick="JavaScript:OpenBkmark(); return false">bookmark</a>');
      document.write('</td></tr></table>');
      document.writeln('<hr align="center" width="90%">');
   }
}

//-------------------------------------------------------------------------------
