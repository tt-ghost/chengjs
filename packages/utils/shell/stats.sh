#!/bin/bash

# 扩展名
extens=(".js" ".css" ".html" ".ts" ".vue" ".jsx" ".tsx" ".json" ".sh" ".md" ".yml" ".yaml" ".less"".scss" ".styl")

filesCount=0
linesCount=0
js=0
css=0
html=0
ts=0
vue=0
jsx=0
styl=0


function funCount()
{
  for file in ` ls $1 `
  do
    if [ -d $1"/"$file ];then
      funCount $1"/"$file
    else
      fileName=$1"/"$file

      EXTENSION="."${fileName##*.}

      if [ $EXTENSION = ".js" ];then
        let js=$js+1
      elif [ $EXTENSION = ".css" ];then
        let css=$css+1
      elif [ $EXTENSION = ".html" ];then
        let html=$html+1
      elif [ $EXTENSION = ".ts" ];then
        let ts=$ts+1
      elif [ $EXTENSION = ".vue" ];then
        let vue=$vue+1
      elif [ $EXTENSION = ".jsx" ];then
        let jsx=$jsx+1
      elif [ $EXTENSION = ".styl" ];then
        let styl=$styl+1
      fi

      if [[ "${extens[@]/$EXTENSION/}" != "${extens[@]}" ]];then
        declare -i fileLines
        fileLines=`sed -n '$=' $fileName`
        # echo $file" : "$fileLines
        let linesCount=$linesCount+$fileLines
        let filesCount=$filesCount+1
      fi
    fi
  done
}
if [ $# -gt 0 ];then
  for m_dir in $@
  do
    funCount $m_dir
  done
else
  funCount "."
fi

echo
echo "js  文件数：$js"
echo "css 文件数：$css"
echo "html文件数：$html"
echo "ts  文件数：$ts"
echo "vue 文件数：$vue"
echo "jsx 文件数：$jsx"
echo "styl文件数：$styl"
echo
echo "  总文件数：$filesCount    行数：$linesCount"
