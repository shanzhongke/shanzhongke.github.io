# 游方居

> 個人生活博客 閑暇愛好 集腋成裘 皆記於此

## 項目啟動(Installation)

    npm install markdown
    npm run dev

## 項目説明

項目由vue-cli搭建，是一個基於vue2.0的單頁應用，頁面比較簡單，分爲首頁，列表頁及文章頁三種，通过读取并解析markdown文件来显示文章，目前項目由於運行於github Page(https://shanzhongke.github.io/)上，因此讀取的都爲本地數據，但是使用的是基於之前公司代碼修改的模擬接口（攔截請求並模擬數據返回），因此可以在真實接口與模擬接口之間方便切換,另外項目沒有對低版本IE做兼容處理

為便於訪問github Page，master分支上為打包好的運行代碼，dev分支上為原始代碼

## 技術架構

1. vue2.0
2. vue-router (路由系統)
3. vue-resource (數據請求處理)
4. iconfont (矢量圖標)
5. markdown-js (markdown语法解析)

## 目前問題

每次音頻播放切換后都會重新請求音頻數據，流量消耗對於移動端較多，目前在純前端方面還未找到緩存音頻的方法

## 項目結構(project structure)

``` bash
|-build  				//webpack配置
|-config
|-src  					//开发目录
|----App.vue  			//首頁及组件挂载
|----main.js  			//初始化配置
|----pages  		    //各個頁面模塊
|----router  		    //路由配置
|----assets  			//资源
|----const  			//一些固定性文字
|----components  		//组件
|-static
|-test					//模擬接口
