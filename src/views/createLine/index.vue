<template>
  <section class="main-home-body">
    <section class="main-home-body-wrap">
      <section class="main-home-body-center" v-loading="contentLoading">
        <section class="content" v-for="item in updateTimeline" :key="item._id">
          <header class="content-header">
            <h1>{{item.name.substring(6,100)}}</h1>
            <ul class="content-header-tag">
              <li>
                <i class="el-icon-date"></i>
                发表于{{item.date | parseTime}}
              </li>
              <li>
                <i class="el-icon-folder"></i>
                收藏于{{item.parentCatelog}}
              </li>
              <li>
                <i class="el-icon-view"></i>
                阅读次数{{item.visits}}
              </li>
            </ul>
          </header>
          <div class="content-body" v-html="item.content"></div>
          <footer class="content-footer">
            <span>
              <router-link :to="`itemPark/itemDetail/${item._id}`">阅读全文</router-link>
              <i class="el-icon-d-arrow-right"></i>
            </span>
          </footer>
        </section>
        <section class="content-pagination">
          <el-pagination
            class="main-page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageConfig.pageNum"
            :page-sizes="[5, 10]"
            :page-size="pageConfig.pageSize"
            layout="sizes, prev, pager, next, jumper"
            :total="pageConfig.total"
            v-if="!contentLoading"
          ></el-pagination>
        </section>
      </section>
    </section>
    <section class="main-downscroll"></section>
  </section>
</template>

<script>
import { getUser } from "@/api/user.js";
import { getArticleTimeline } from "@/api/article.js";
import categoryCom from "@/components/Category";
import { validateContent } from "@/utils/validate";

export default {
  props: {},
  data() {
    let pageSize = $global.page.pageSizes[0]; //获取全局页码
    return {
      contentLoading: false, //加载动画
      updateTimeline: [], //时间线数据
      pageConfig: {
        //分页配置
        pageSize,
        pageNum: 1,
        total: 0
      }
    };
  },
  activated() {
    this.getBasicInfo();
    this.getTimeline();
  },
  mounted() {},
  destroyed() {},
  methods: {
    getTimeline() {
      //   获取文章时间线
      this.contentLoading = true;

        // let data = [
        //   {
        //     subArticles: [],
        //     date: "1562557528000",
        //     visits: 7,
        //     _id: "5d22b74509d9a5117140281c",
        //     isCatelog: 0,
        //     name: "( 一 )  addEventListener",
        //     parentId: "5d22b70509d9a5117140281a",
        //     __v: 0,
        //     content:
        //       '<p><span style="color: rgb(255, 255, 255);">当我们给document添加了touch事件的监听器的时候，如果同时在handler内部调用了event.preventDefault()，这时候浏览器（Chrome 56+）就会报一个warning：Unable to preventDefault inside passive event listener due to target being treated as passive</span></p><p><span style="color: rgb(255, 255, 255);">这句警告翻译过来就是：不能给passive(被动的)事件监听器preventDefault，因为它被认为是passive。</span></p><p><br></p><p><span style="color: rgb(255, 255, 255);">我们知道，当我们使用addEventListener的时候，我们一般的写法是以下：</span></p><pre class="ql-syntax" spellcheck="false">target.addEventListener(event, handler);\n</pre><p><span style="color: rgb(255, 255, 255);">但是其实它还有一种更加合理的方法：</span></p><pre class="ql-syntax" spellcheck="false">target.addEventListener(event, handler, false)\n</pre><p><span style="color: rgb(255, 255, 255);">addEventListener还有第三个参数，这第三个参数是一个布尔值，叫useCapture，也就是指在DOM树中，注册了该listener的元素，是否会先于它下方的任何事件目标，接收到该事件。我们知道，DOM事件流（event flow）存在三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。如果useCapture设置为false，当前eventTarget就不会在捕获阶段接收该事件。浏览器默认我们不会在捕获阶段触发绑定事件的handler。</span></p><p><span style="color: rgb(255, 255, 255);">值得注意的是，第三个参数是在近段时间被调整为一组配置项:</span></p><p><span style="color: rgb(255, 255, 255);">{</span></p><p><span style="color: rgb(255, 255, 255);">&nbsp;capture: Boolean, // 表示“listener”会在该类型的事件捕获阶段传播到该“EventTarget”时触发</span></p><p><span style="color: rgb(255, 255, 255);">&nbsp;once: Boolean, // 表示“listener”在添加之后最多只调用一次。如果是“true”，“listener”会在其被调用之后自动移除</span></p><p><span style="color: rgb(255, 255, 255);">passive: Boolean, // 表示“listener”永远不会调用“preventDefault()”。如果“listener”仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告</span></p><p><span style="color: rgb(255, 255, 255);">}</span></p><p><span style="color: rgb(255, 255, 255);">从Chrome 51开始，passive event listener被引进了Chrome，我们可以通过对addEventListener的第三个参数设置{ passive: true }来避免浏览器检测这个我们是否有在touch事件的handler里调用preventDefault。在这个时候，如果我们依然调用了preventDefault，就会在控制台打印一个警告。告诉我们这个preventDefault会被忽略。</span></p><p><span style="color: rgb(255, 255, 255);">当我们给addEventListener的第三个参数设置了{ passive: true }，这个事件监听器就被称为passive event listener。</span></p><p><span style="color: rgb(255, 255, 255);">从Chrome 56开始，如果我们给document绑定touchmove或者touchstart事件的监听器，</span><strong style="color: rgb(255, 255, 255);">这个passive是会被默认设置为true以提高性能，</strong><span style="color: rgb(255, 255, 255);">但是我们大多数人并不知道这点，并且依旧调用了preventDefault。这并不会导致什么页面崩溃级的错误，但是这可能导致我们忽略了一个页面性能优化的点，特别是在移动端这种更加重视性能优化的场景下。</span></p><p><span style="color: rgb(255, 255, 255);">如果我们需要兼容旧版浏览器，需要进行兼容性判断：</span></p><pre class="ql-syntax" spellcheck="false">let passiveSupported = false;\ntry {\n  let options = Object.defineProperty({}, "passive", {\n    get: function () {\n        passiveSupported = true;\n    }\n  });\n  window.addEventListener("test", null, options);\n} catch (err) {\n  console.log(err);\n}\nexport default passiveSupported;\n</pre><p><br></p><p><span style="color: rgb(255, 255, 255);">并且，在项目中：</span></p><pre class="ql-syntax" spellcheck="false">import passiveSupported  from \'@/utils/passiveSupported\';    // 引入\n// ...\n\n//如果浏览器兼容对象上的passive\nwindow.addEventListener(event, handler, passiveSupported ? { passive: false } : false);\n</pre>',
        //     parentCatelog: "前端兼容性问题收录"
        //   },
        //   {
        //     subArticles: [],
        //     date: "1562141143184",
        //     visits: 6,
        //     _id: "5d1e0f2509d9a51171402815",
        //     isCatelog: 0,
        //     name: "( 二 ) Node中的JavaScript",
        //     parentId: "5d0b39a0f37b4169988b67e5",
        //     __v: 0,
        //     content:
        //       '<h1><span style="color: rgb(255, 255, 255);">前言</span></h1><p><span style="color: rgb(255, 255, 255);">在Node.js中写JavaScript和在浏览器中写JavaScript完全不同，Node.js除了提供和浏览器一样的基本语言之外，还在语言的基础上提供了构建强大网络应用所需的API。</span></p><h1><span style="color: rgb(255, 255, 255);">globle对象</span></h1><p><span style="color: rgb(255, 255, 255);">众所周知，在浏览器中，全局对象指的是window对象，在window对象上定义的任何内容都能被全局访问到，比如：doucment其实就是window.document，setTimeout实际上就是window.setTimeout</span></p><p><span style="color: rgb(255, 255, 255);">而在node中有两个类似但是却代表着不同含义的对象，如下所示：</span></p><ol><li><strong style="color: rgb(255, 255, 255);">global：和window一样，任何global对象上的属性都可以被全局访问到。</strong></li><li><strong style="color: rgb(255, 255, 255);">process：所有全局执行上下文中的内容都在process对象中。在浏览器中，只有一个window对象，在node中也只有一个process对象，在浏览器中，窗口的名字是window.name。类似的，在node中，进程的名字是process.title。</strong></li></ol><h1><strong style="color: rgb(255, 255, 255);">模块系统</strong></h1><p><span style="color: rgb(255, 255, 255);">在JavaScript的标准语言中，并未为模块依赖以及模块独立定义专门的API，因此，这就导致了通过这种方式引入的多个模块会出现对全局命名空间的污染，及命名冲突问题。Node摒弃了采用定义一堆全局变量的方式，转而引入了一种强大无比的模块系统，该模块有三个核心的全局对象：</span></p><p><strong style="color: rgb(255, 255, 255);">require</strong><span style="color: rgb(255, 255, 255);">、</span><strong style="color: rgb(255, 255, 255);">module</strong><span style="color: rgb(255, 255, 255);">和</span><strong style="color: rgb(255, 255, 255);">exports。</strong></p><h2><strong style="color: rgb(255, 255, 255);">绝对和相对模块</strong></h2><h3><span style="color: rgb(255, 255, 255);">绝对模块：指的是通过node_modules查找到的模块，或者说是Node内置的加fs这样的模块。|</span></h3><p><span style="color: rgb(255, 255, 255);">比如说我们安装好了XX模块，那么其路径就变成了./node_modules/XX</span></p><p><span style="color: rgb(255, 255, 255);">这时，我们可以直接通过</span></p><pre class="ql-syntax" spellcheck="false">require(\'XX\');\n</pre><h3><span style="color: rgb(255, 255, 255);">相对模块：相对模块将require指向一个相对工作目录中的JavaScript文件。</span></h3><p><span style="color: rgb(255, 255, 255);">例如有：</span></p><p><span style="color: rgb(255, 255, 255);">文件A：</span></p><pre class="ql-syntax" spellcheck="false">//module_a.js\nconsole.log(this.a);\n</pre><p><span style="color: rgb(255, 255, 255);">文件B：</span></p><pre class="ql-syntax" spellcheck="false">//module_b.js\nconsole.log(this.b);\n</pre><p><span style="color: rgb(255, 255, 255);">主文件main.js：</span></p><pre class="ql-syntax" spellcheck="false">//main.js\nrequire(\'module_a\');\nrequire(\'modele_b\');\n</pre><p><span style="color: rgb(255, 255, 255);">这时运行主文件将会报错，因为Node未能找到module_a和module_b。原因就在于他们不是通过npm来安装的，也不再node_modules目录中，正确的引用方式是使用相对引用的方式：</span></p><pre class="ql-syntax" spellcheck="false">//main.js\nrequire(\'./module_a\');\nrequire(\'./modele_b\');\n</pre><p><span style="color: rgb(255, 255, 255);">这时，才会正确引用成功！</span></p><h1><span style="color: rgb(255, 255, 255);">暴露API</span></h1><p><span style="color: rgb(255, 255, 255);">要让模块暴露一个API称为require调用的返回值，就要依靠module和exports这两个全局变量。在默认情况下，每个模块都会暴露一个空对象，如果你想要在该对象上添加属性，那么简单的使用exports即可：</span></p><p><span style="color: rgb(255, 255, 255);">文件A：</span></p><pre class="ql-syntax" spellcheck="false">//module_a.js\nexports.name = \'Austin\';\nlet data = 5;\nexports.getData = function(){\n  return data; \n}\n</pre><p><span style="color: rgb(255, 255, 255);">主文件main.js：</span></p><pre class="ql-syntax" spellcheck="false">//main.js\nlet a = require(\'./module_a\');\nconsole.log(a.name);   // Austin\nconsole.log(a.getData());  // 5\n</pre><p><span style="color: rgb(255, 255, 255);">注意，上面的exports其实就是对module.exports的引用，其在默认情况下是一个对象，我们甚至可以重写module.exports来满足更加强大的需求（如果逐个添加属性无法满足我们的需求的话）：</span></p><p><span style="color: rgb(255, 255, 255);">文件Person：</span></p><pre class="ql-syntax" spellcheck="false">//module_person.js\nmodule.exports = Person;\n\nfunction Person (name) {\n  this.name = name\n}\nPerson.prototype.talk = function(){\n  console.log(\'My name is\',this.name);\n}\n</pre><p><span style="color: rgb(255, 255, 255);">主文件main.js：</span></p><pre class="ql-syntax" spellcheck="false">//main.js\nlet Person = require(\'./person\');\nlet Austin = new Person(\'Austin\');\nAustin.talk();\n</pre><p><span style="color: rgb(255, 255, 255);">在main.js文件中，我们不再是接收一个对象作为返回值，而是函数，这就归功于对module.exports的重写。</span></p><p><br></p>',
        //     parentCatelog: "Node.js 学习札记"
        //   },
        //   {
        //     subArticles: [],
        //     date: "1562141143184",
        //     visits: 6,
        //     _id: "5d22e37b09d9a51171402822",
        //     isCatelog: 0,
        //     name: "( 七 ) 类型和值",
        //     parentId: "5ce21b2d5827f72e48cb6a41",
        //     __v: 0,
        //     content:
        //       '<h1><span style="color: rgb(255, 255, 255);">前言</span></h1><p><span style="color: rgb(255, 255, 255);">对于语言引擎和开发者来说，类型是值的内部特征，它定义了值的行为，以使其区别于其他值。</span></p><h1><span style="color: rgb(255, 255, 255);">类型</span></h1><p><span style="color: rgb(255, 255, 255);">之前提到过，对象是JavaScript的基础。在JavaScript中一共有六种主要类型（术语是“语言类型”）：string、number、boolean、null 、undefined、object、symbol（符号，ES6新增）。以及对象子类型String、Number、Boolean、Object、Function、Array、Date、RegExp、Error。并且，利用typeof可以查看值的类型：</span></p><pre class="ql-syntax" spellcheck="false">typeof undefined  === "undefined"   // true\ntypeof true  === "boolean"  //true\ntypeof 42  === "number"   //true\ntypeof "42"  === "string"  //true\ntypeof { life : 42 }  === "object"   //true\ntypeof Symbol()  === "symbol"   //true\n</pre><p><span style="color: rgb(255, 255, 255);">注意：typeof null 不能正确的返回我们想要的结果null，而是：</span></p><pre class="ql-syntax" spellcheck="false">typeof null  === "null"  //false\ntypeof null  === "object"  //true\n</pre><p><span style="color: rgb(255, 255, 255);">这是语言自身存在的bug，如果我们想正确的检测null类型，可以使用复合条件来检测：</span></p><pre class="ql-syntax" spellcheck="false">var a = null;\n(!a &amp;&amp; typeof a === "object");  // true\n</pre><p><span style="color: rgb(255, 255, 255);">另外一种普遍合理的检测类型的方法是，我们可以用它来检测任意类型的值：</span></p><pre class="ql-syntax" spellcheck="false">Object.prototype.toString.call(null) === "[object Null]";   //true\n</pre><p><span style="color: rgb(255, 255, 255);">还有一种比较特殊的情况是：</span></p><pre class="ql-syntax" spellcheck="false">typeof function a(){...} === "function"; // true\n</pre><p><span style="color: rgb(255, 255, 255);">看上去似乎function也是主要类型之一，但是其只是object的一个子类型。《JavaScript高级程序设计》给出的解释是：从技术角度讲，函数在ECMAScript中是对象，不是一种数据类型。然而，函数也确实有一些特殊的属性，因此通过typeof操作符来区分函数和其他对象是有必要的。</span></p><p><span style="color: rgb(255, 255, 255);">函数不仅是对象，还可以拥有属性：</span></p><pre class="ql-syntax" spellcheck="false">function a(b,c){...}\nconsole.log(function.length);   // 2\n</pre><p><span style="color: rgb(255, 255, 255);">length属性表示其声明的参数的个数。</span></p><p><span style="color: rgb(255, 255, 255);">对于其他的对象子类型，诸如String、Number、Boolean、Object、Array、Date、RegExp、Error等，利用typeof检测类型均返回“object”；</span></p><h2><span style="color: rgb(255, 255, 255);">undefined和undeclared</span></h2><p><span style="color: rgb(255, 255, 255);">已在作用域中声明，但还没赋值的变量是undefined的，相反，还没有在作用域中声明过的变量，是undeclared的</span></p><pre class="ql-syntax" spellcheck="false">var a;\na; //undefined\nb; // ReferenceError: b is not defined\n</pre><p><span style="color: rgb(255, 255, 255);">注意undefined和is not defined是两码事，但是typeof对其处理结果却是一样的：</span></p><pre class="ql-syntax" spellcheck="false">var a;\ntypeof(a); // "undefined"\ntypeof(b); // "undefined"\n</pre><p><span style="color: rgb(255, 255, 255);">虽然b是一个undeclared变量，但是typeof b并没有报错。这是因为typeof有一个特殊的安全防范机制。</span></p><h2><span style="color: rgb(255, 255, 255);">typeof Undeclared</span></h2><p><span style="color: rgb(255, 255, 255);">该安全防范机制对在浏览器中运行的JavaScript代码来说还是很有帮助的，因为多个脚本文件会在共享的全局命名空间中加载变量。</span></p><p><span style="color: rgb(255, 255, 255);">举个简单的例子：</span></p><p><span style="color: rgb(255, 255, 255);">在程序中使用全局变量DEBUG作为“调试模式”的开关。在输出调试信息到控制台之前，我们会检查DEBUG变量是否已被声明。顶层的全局变量声明var DEBUG=true只在debug.js文件中才有，而该文件只在开发和测试时才被加载到浏览器，在生产环境中不予加载。问题是如何在程序中检查全局变量DEBUG才不会出现ReferenceError错误。这时typeof的安全防范机制就成了我们的好帮手：</span></p><pre class="ql-syntax" spellcheck="false">// 这样会抛出错误\nif (DEBUG) {\n    console.log("Debugging is starting");\n}\n// 这样是安全的\nif (typeof DEBUG !== "undefined") {\n    console.log("Debugging is starting");\n}\n</pre><p><span style="color: rgb(255, 255, 255);">另外2，一种不用通过typeof安全防范机制的方法，就是检查所有全局变量是否是全局对象的属性：</span></p><pre class="ql-syntax" spellcheck="false">if (window.DEBUG) {\n    // ..\n}\nif (!window.atob) {\n    // ..\n}\n</pre><p><span style="color: rgb(255, 255, 255);">与undeclared变量不同，访问不存在的对象属性（甚至是在全局对象window上）不会产生ReferenceError错误。</span></p><p><span style="color: rgb(255, 255, 255);">一些开发人员不喜欢通过window来访问全局对象，尤其当代码需要运行在多种JavaScript环境中时（不仅仅是浏览器，还有服务器端，如node.js等），因此此时全局对象并非总是window。</span></p><p><span style="color: rgb(255, 255, 255);">从技术角度来说，typeof的安全防范机制对于非全局变量也很管用，虽然这种情况并不多见，也有一些开发人员不大愿意这样做。如果想让别人在他们的程序或模块中复制黏贴你的代码，就需要检查你用到的变量是否已经在宿主程序中定义过：</span></p><pre class="ql-syntax" spellcheck="false">function doSomethingCool() {\n    var helper =\n        (typeof FeatureXYZ !== "undefined") ?\n            FeatureXYZ :\n            function () { /*.. default feature ..*/ };\n    var val = helper();\n    // ..\n}\n</pre><h1><span style="color: rgb(255, 255, 255);">值</span></h1><h2><span style="color: rgb(255, 255, 255);">数组</span></h2><p><span style="color: rgb(255, 255, 255);">与其他强类型的语言不同，JavaScript中的数组可以容纳任何类型的值，可以是字符串、对象甚至其他数组。</span></p><p><span style="color: rgb(255, 255, 255);">当我们在创建“稀疏”数组的时候要特别注意：</span></p><pre class="ql-syntax" spellcheck="false">var a = [];\na[0] = 1;\na[2] = [3];\nconsole.log(a[1]);  // undefined\nconsole.log(a);  // [1, empty, Array(1)] \n</pre><p><span style="color: rgb(255, 255, 255);">值得注意的是：虽然这里a[1]的值为undefined，因为这里我们省略了对a[1]的赋值，但这与将其显式赋值为a[1] = undefined还是有所区别：</span></p><p><span style="color: rgb(255, 255, 255);">当我们对上面的代码调用map函数时：</span></p><pre class="ql-syntax" spellcheck="false">var b = a.map(item =&gt; 2);\nvar c = a.join(\',\');\n\n// 未显式赋值a[1]\n// b   [2,empty,2];\n// c   1,,3\n\n// 显式赋值a[1]\n// b   [2,2,2]\n// c   1,,3    \n</pre><h2><span style="color: rgb(255, 255, 255);">类数组</span></h2><p><span style="color: rgb(255, 255, 255);">有需要将类数组转化为真正的数组，这一般通过数组函数如：indexOf()、concat()、forEach()等来实现。例如，一些DOM查询操作会返回DOM元素列表，但它们并非真正意义上的数组，这时我们需要对其进行转化（工具函数slice经常用于这类转化）：</span></p><pre class="ql-syntax" spellcheck="false">function foo() {\n    var arr = Array.prototype.slice.call(arguments); //slice()方法返回一个新的数组对象,不会修改原数组\n    arr.push( "bam" );\n    console.log( arr );\n}\n\nfoo("bar","baz");  // ["bar","baz","bam"];\n\n// 利用ES6的内置工具函数Array.from(..)也能实现同样的的功能\n... \nvar arr = Array.from( arguments ); \n...\n</pre><h2><span style="color: rgb(255, 255, 255);">字符串</span></h2><p><span style="color: rgb(255, 255, 255);">虽然JavaScript中的字符串和数组有许多类似的地方：都具有length属性，以及indexOf和concat方法等，但是JS中的字符串是不可变的，而数组是可变的，这里的字符串不可变指的是：一旦字符串被声明，其值将会被存入某个地址A，当试图改变字符串时，会重新开辟一个新的地址B，而原地址A并不会被销毁。另一个字符串区别于数组的地方在于：数组具备一个区别于字符串的可变更成员函数reverse()：</span></p><pre class="ql-syntax" spellcheck="false">let a = "Austin Wen";\nlet b = ["A","u","s","t","i","n"]; \na.reverse; // a.reverse is not a function \nb.reverse(); // ["n", "i", "t", "s", "u", "A"]\n</pre><p><span style="color: rgb(255, 255, 255);">当然，如果想实现字符串的反转，我们可以借用数组的reserve函数：</span></p><pre class="ql-syntax" spellcheck="false">Array.prototype.reverse.call(a);\n</pre><p><span style="color: rgb(255, 255, 255);">也可以先将字符串转化为数组，再将数组转变为字符串：</span></p><pre class="ql-syntax" spellcheck="false">a.split("")  // 转为数组\n.reverse()  // 进行元素倒转\n.join("");  // 拼接回字符串\n</pre><p><span style="color: rgb(255, 255, 255);">另外，当我们在对字符串取值的时候最好不用a[1]的形式，这在老版的IE浏览器中时不被兼容的，比较合理的一种形式是利用a.charAt(1)。</span></p><h2><span style="color: rgb(255, 255, 255);">特殊数值</span></h2><h3><span style="color: rgb(255, 255, 255);">不是值的值</span></h3><p><span style="color: rgb(255, 255, 255);">undefined类型只有一个值，即undefined。null类型也只有一个值即null。它们的名称既是类型，也是值。二者的区别在于：</span></p><p><span style="color: rgb(255, 255, 255);">undefined 指没有值，指从未赋值。</span></p><p><span style="color: rgb(255, 255, 255);">null 指空值，指曾赋过值，但是目前没有值</span></p><h2><span style="color: rgb(255, 255, 255);">特殊的数字</span></h2><h3><span style="color: rgb(255, 255, 255);">不是数字的数字NaN</span></h3><pre class="ql-syntax" spellcheck="false">var a = 2/"foo";  // NaN\ntypeof a === "number";  // true   注意:不是数字的数字的类型是数字!!!!!!\n</pre><p><span style="color: rgb(255, 255, 255);">另外，NaN是一个特殊值，其和自己并不相等，NaN ！= NaN 那我们如何来判断一个值是否为NaN？：</span></p><pre class="ql-syntax" spellcheck="false">利用内置函数isNaN：\nvar a = 2/"foo"\nisNaN( a );  // true\n</pre><p><span style="color: rgb(255, 255, 255);">但是这种方法有一个缺陷在于用其检测字符串的话结果也是true：</span></p><pre class="ql-syntax" spellcheck="false">var b = "foo"\nisNaN(b)  // true\n</pre><p><span style="color: rgb(255, 255, 255);">该函数可以更纯粹的理解为判断一个变量 是否不是一个数字!~~</span></p><p><span style="color: rgb(255, 255, 255);">更合理的一种方式是利用ES6的工具函数</span><strong style="color: rgb(255, 255, 255);">Number.isNaN(..) </strong><span style="color: rgb(255, 255, 255);">此外，利用NaN是JavaScript中唯一一个不等于自身的值，我们可以这样：</span></p><pre class="ql-syntax" spellcheck="false">function(!Number.isNan){\n  Number.isNaN = function(n) {\n    return n ! == n;\n  };\n}\n</pre><h1><span style="color: rgb(255, 255, 255);">原生函数</span></h1><p><span style="color: rgb(255, 255, 255);">JavaScript中的原生函数也叫内建函数，如下所示：</span></p><p><strong style="color: rgb(255, 255, 255);">String()</strong></p><p><strong style="color: rgb(255, 255, 255);">Number()</strong></p><p><strong style="color: rgb(255, 255, 255);">Boolean()</strong></p><p><strong style="color: rgb(255, 255, 255);">Object()</strong></p><p><strong style="color: rgb(255, 255, 255);">Function()</strong></p><p><strong style="color: rgb(255, 255, 255);">Array()</strong></p><p><strong style="color: rgb(255, 255, 255);">Date()</strong></p><p><strong style="color: rgb(255, 255, 255);">RegExp()</strong></p><p><strong style="color: rgb(255, 255, 255);">Error()</strong></p><p><strong style="color: rgb(255, 255, 255);">Symbol() </strong></p><p><span style="color: rgb(255, 255, 255);">原生函数可以被当作构造函数来使用，但其构造出来的对象可能会和我们设想的有所出入：</span></p><pre class="ql-syntax" spellcheck="false">var a = new String("abc");\ntypeof a;  //  "object"\na instanceof String;  // "true"\nObject.prototype.toString.call(a);  // "[object String]" \n</pre><h2><span style="color: rgb(255, 255, 255);">拆分</span></h2><p><span style="color: rgb(255, 255, 255);">如果想要得到封装对象中的基本类型的值，可以使用</span><strong style="color: rgb(255, 255, 255);">valueOf()</strong><span style="color: rgb(255, 255, 255);">函数：</span></p><pre class="ql-syntax" spellcheck="false">var a = new String( "abc" )\nvar b = new Number( 42 )\nvar c = new Booleab( true )\n\na.valueOf();  //  "abc"\na.valueOf();  //  "42"\na.valueOf();  //  "true"\n</pre><p><span style="color: rgb(255, 255, 255);">在需要用到封装对象中的基本类型值的地方会发生隐式拆封：</span></p><pre class="ql-syntax" spellcheck="false">var a = new String( "abc" )\nvar b = a + "";  // b的值为"abc"\ntypeof a;  // "object"\ntypeof b;  // "string"\n</pre><h1><span style="color: rgb(255, 255, 255);">强制类型转换</span></h1><pre class="ql-syntax" spellcheck="false">var a = 42;\nvar b = a + "";  // 隐式强制类型转换\nvar c = String( a );  // 显式强制类型转换\n</pre><h2><span style="color: rgb(255, 255, 255);">ToString</span></h2><p><span style="color: rgb(255, 255, 255);">对普通对象来说，除非自己定义，否则toString方法返回的是内部属性[[Class]]的值，如"[object Object]"</span></p><h2><span style="color: rgb(255, 255, 255);">ToNumber</span></h2><h2><span style="color: rgb(255, 255, 255);">ToBoolean</span></h2><h3><span style="color: rgb(255, 255, 255);">假值（假值的布尔强制类型转换结果为false）：</span></h3><p><span style="color: rgb(255, 255, 255);">undefined</span></p><p><span style="color: rgb(255, 255, 255);">null</span></p><p><span style="color: rgb(255, 255, 255);">false</span></p><p><span style="color: rgb(255, 255, 255);">+0 -0 和 NaN</span></p><p><span style="color: rgb(255, 255, 255);">“ ” （唯一一个为假值的字符串）</span></p><h3><span style="color: rgb(255, 255, 255);">假值对象（强制类型转化为布尔值的结果为false）：</span></h3><p><span style="color: rgb(255, 255, 255);">假值对象并不是包装了假值的封装对象，例如：</span></p><pre class="ql-syntax" spellcheck="false">var a = new Boolean( false );\nvar b = new Number( 0 );\nvar c = new String( "" );\n</pre><p><span style="color: rgb(255, 255, 255);">以上均是封装了假值的对象，那他们究竟是true还是false呢？</span></p><pre class="ql-syntax" spellcheck="false">var d = Boolean( a&amp;&amp;b&amp;&amp;c );\nd; // true\n</pre><p><span style="color: rgb(255, 255, 255);">如果说假值对象并非封装了假值的对象，那它究竟是什么呢？最常见的例子是document.all，它是一个类数组对象，包含了页面上的所有元素，为什么它的值是假值呢？因为我们经常通过它来判断浏览器是否为老版本的IE</span></p><pre class="ql-syntax" spellcheck="false">if(document.all){  /* 是老版本的IE */ }\n</pre><p><span style="color: rgb(255, 255, 255);">因此，为了让新版本更符合标准，将document.all作为假值来处理！</span></p><h3><span style="color: rgb(255, 255, 255);">真值（假值以外的值）</span></h3><p><span style="color: rgb(255, 255, 255);">所有字符串（除了 “ ” 以外）</span></p><p><span style="color: rgb(255, 255, 255);">数组</span></p><p><span style="color: rgb(255, 255, 255);">对象</span></p><p><span style="color: rgb(255, 255, 255);">函数</span></p><p><span style="color: rgb(255, 255, 255);">...</span></p><h2><span style="color: rgb(255, 255, 255);">字符串和数字间的显式转换</span></h2><p><span style="color: rgb(255, 255, 255);">字符串和数字之间的转换是通过</span><strong style="color: rgb(255, 255, 255);">String(..)</strong><span style="color: rgb(255, 255, 255);">和</span><strong style="color: rgb(255, 255, 255);">Number(..)</strong><span style="color: rgb(255, 255, 255);">这两个内建函数来实现的：</span></p><pre class="ql-syntax" spellcheck="false">var a = 42;\nvar b = String( a );\n\nvar c = "3.14";\nvar d = Number( c );\n\nb;  // "42"\nd:  // 3.14\n</pre><p><span style="color: rgb(255, 255, 255);">除了上述的两种方法以外，还有其他方法可以实现字符串和数字之间的显式转换：</span></p><pre class="ql-syntax" spellcheck="false">var a = 42;\nvar b = a.toString();\nvar c = "3.14";\nvar d = +c;\nb;  // "42"\nd;  // 3.14 \n</pre><h3><span style="color: rgb(255, 255, 255);">日期显式转换为数字</span></h3><p><span style="color: rgb(255, 255, 255);">一元运算符的另一个常见的用途是将日期(Date)对象强制类型转换为数字，返回结果为Unix时间戳：</span></p><pre class="ql-syntax" spellcheck="false">var d = new Date();\nconsole.log(d);  // "Mon Jul 29 2019 14:50:05 GMT+0800 (中国标准时间)"\nconsole.log(+d);  // 1564383005000\n</pre><p><span style="color: rgb(255, 255, 255);">因此，我们常用下面的方法来获得当前的时间戳：</span></p><pre class="ql-syntax" spellcheck="false">var timestamp = + new Date();\n\n</pre><p><span style="color: rgb(255, 255, 255);">当然也可以不用强制类型转换为时间戳：</span></p><pre class="ql-syntax" spellcheck="false">var timestamp = new Date().getTime();\n//  1564383300160\n</pre><p><span style="color: rgb(255, 255, 255);">或者使用ES5新增的静态方法Date.now();</span></p><pre class="ql-syntax" spellcheck="false">var timestamp = Date.now();\n</pre><p><span style="color: rgb(255, 255, 255);">不建议使用强制类型转换，我们可以使用Date.now()来获取当前的时间戳，使用new Date(...).getTime()来获得指定时间的时间戳。</span></p><h2><span style="color: rgb(255, 255, 255);">显示解析数字字符串</span></h2><p><strong style="color: rgb(255, 255, 255);">parseInt()和parseFloat()可以分别用来解析整数以及浮点数，二者仅仅针对字符串，传入其他类型的参数是没有用的。</strong></p><pre class="ql-syntax" spellcheck="false">var a = “42”;\nvar b = “42px”;\nNumber( a );  // 42\nparseInt( a );  // 42\n\nNumber( b );  // NaN\nparseInt( b );  // 42\n</pre><p><span style="color: rgb(255, 255, 255);">解析允许字符串中包含非数字字符，解析顺序从左到右，遇到非数字字符就会停止。而转换不允许出现非数字字符，否则会失败并返回NaN。</span></p><h2><span style="color: rgb(255, 255, 255);">解析非字符串</span></h2><p><span style="color: rgb(255, 255, 255);">看个奇怪的例子：</span></p><pre class="ql-syntax" spellcheck="false">parseInt( 1/0 , 19 );  // 18 ????\n</pre><p><span style="color: rgb(255, 255, 255);">其实，上述例子的实际解析情况为：</span></p><pre class="ql-syntax" spellcheck="false">parseInt( "Infinity", 19 );  // 19进制 :  0-9 A-I  因此I有效 N无效  因此结果为18\n</pre><p><span style="color: rgb(255, 255, 255);">其他例子：</span></p><pre class="ql-syntax" spellcheck="false">parseInt( 0.000008 );  // 0 ("0"来自于"0.000008");\nparseInt( 0.0000008 );  // 8 ("8"来自于"8e-7");\nparseInt( false,16 );  // 250 ("fa"来自于"false");\nparseInt( parseInt,16);  // 15 ("f"来自于"function..");\n</pre><h2><span style="color: rgb(255, 255, 255);">宽松相等与严格相等("=="和"===")</span></h2><p><span style="color: rgb(255, 255, 255);">一个区别：“==允许在相等的时候进行强制类型转换，而===不允许”</span></p><h3><span style="color: rgb(255, 255, 255);">null和undefined之间的比较</span></h3><p><span style="color: rgb(255, 255, 255);">null和undefined之间的 == 也涉及隐式强制类型转换：</span></p><p><span style="color: rgb(255, 255, 255);">（1）如果x为null，y为undefined，则结果为true</span></p><p><span style="color: rgb(255, 255, 255);">（2）如果x为undefined，y为null，则结果也为true</span></p><p><span style="color: rgb(255, 255, 255);">也就是说在==中，null和undefined相等，除此之外其他值都不和他们两个相等。</span></p>',
        //     parentCatelog: "JavaScript"
        //   },
        //   {
        //     subArticles: [],
        //     date: "1562141143184",
        //     visits: 6,
        //     _id: "5ddc900509d9a5117140284e",
        //     isCatelog: 0,
        //     name: "JS优美代码片段收录",
        //     parentId: "0",
        //     __v: 0,
        //     content:
        //       '<h1><span style="color: rgb(255, 255, 255);">一些非常有用的snippets(代码片段)介绍及自我理解</span></h1><h3><span style="color: rgb(255, 255, 255);">1.求多重数组(可指定数组取值长度)的最小值(ary)</span></h3><pre class="ql-syntax" spellcheck="false">const ary = (fn, n) =&gt; (...args) =&gt; fn(...args.slice(0, n));\n\nExample:\nconst firstTwoMax = ary(Math.max, 2);  // 指定数组前两位\n[[2, 6, \'a\'], [6, 4, 8], [10]].map(x =&gt; firstTwoMax(...x)); // [6, 6, 10]\n</pre><p><strong style="color: rgb(255, 255, 255);">自我理解:</strong></p><pre class="ql-syntax" spellcheck="false">//箭头函数转化为普通函数即可轻松理解上述的代码\nlet ary = function ary(fn,n){\n\treturn function(...args){\n\t\treturn fn(...args.slice(0,n));\n\t}\n}\n</pre><h3><span style="color: rgb(255, 255, 255);">2.根据输入的关键字和一组参数使返回的函数可以根据传入的参数去执行关键字方法(call)</span></h3><pre class="ql-syntax" spellcheck="false">const call = (key, ...args) =&gt; context =&gt; context[key](...args);\n\nExample1:\nconst call = (key, ...args) =&gt; context =&gt; context[key](...args);\ncall(\'map\', x =&gt; 2 * x)([1, 2, 3]) // [ 2, 4, 6 ]\n\nExample2:\nPromise.resolve([1, 2, 3])\n  .then(call(\'map\', x =&gt; 2 * x))\n  .then(console.log); // [ 2, 4, 6 ]\nconst map = call.bind(null, \'map\');\nPromise.resolve([1, 2, 3])\n  .then(map(x =&gt; 2 * x))\n  .then(console.log); // [ 2, 4, 6 ]\n</pre><p><strong style="color: rgb(255, 255, 255);">自我理解:</strong></p><pre class="ql-syntax" spellcheck="false">//箭头函数转化为普通函数\nlet call = function(key,...args){\n\treturn function context(){\n        return context[key](...args);\n   }\n}\n\nExample1: \n运行: call(\'map\', x =&gt; 2 * x)([1, 2, 3])\n返回: function (context) {\n          return context[\'map\'](function(x){ return 2*x });  \n      }([1, 2, 3])\n返回: function ([1,2,3]) {\n           return [1,2,3].map(function(x){ return 2*x });  \n      }\n返回: [2,4,6]\n\nExample2(1):同理可以理解:\n运行: Promise.resolve([1, 2, 3]).then(call(\'map\', x =&gt; 2 * x))\n实际上等价于: Promise.resolve([1, 2, 3]).then(function (context) {\n          return context[\'map\'](function(x){ return 2*x });  \n      });\n即: [1,2,3].map(function(x){ return 2*x }); \n返回: [2,4,6]\n\nExample2(2):同上 主要区别在于利用了bind实现了函数的柯里化(可以分步地传入参数),bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。\n</pre><p><br></p><h3><span style="color: rgb(255, 255, 255);">3.给定一个函数，返回一个闭包，将所有输入收集到一个数组中并传入某个接受函数中(collectInto)。</span></h3><pre class="ql-syntax" spellcheck="false">const collectInto = fn =&gt; (...args) =&gt; fn(args);\n\nExample:\nconst Pall = collectInto(Promise.all.bind(Promise));\nlet p1 = Promise.resolve(1);\nlet p2 = Promise.resolve(2);\nlet p3 = new Promise(resolve =&gt; setTimeout(resolve, 2000, 3));\nPall(p1, p2, p3).then(console.log); // [1, 2, 3] (after about 2 seconds)\n</pre><p><strong style="color: rgb(255, 255, 255);">自我理解:</strong></p><pre class="ql-syntax" spellcheck="false">// 箭头函数转为普通函数\nlet collectInto = function collectInto(fn){\n     return function(...args){\n         return  fn(args);\n   }   \n}\n运行: collectInto(Promise.all.bind(Promise))\n返回: function(...args){\n         return  Promise.all.bind(Promise,args);\n      } \n运行: Pall(p1,p2,p3)\n返回: Promise.all.bind(Promise,args);  =&gt;  Promise.all([p1,p2,p3]).then(console.log);  // [1,2,3]\n \n</pre><p><br></p><h3><span style="color: rgb(255, 255, 255);">4.使用函数作为参数，然后将该函数的第一个参数作为最后一个参数。(flip)。</span></h3><pre class="ql-syntax" spellcheck="false">const flip = fn =&gt; (first, ...rest) =&gt; fn(...rest, first);\n\nExample:\nlet a = { name: \'John Smith\' };\nlet b = {};\nconst mergeFrom = flip(Object.assign);\nlet mergePerson = mergeFrom.bind(null, a);\nmergePerson(b); // == b\nb = {};\nObject.assign(b, a); // == b\n</pre><p><span style="color: rgb(255, 255, 255);">自我理解:</span></p><pre class="ql-syntax" spellcheck="false">很简单,实际上其实就是调用了 Object.assign(b,a)  \n值得注意的是: Object.assign(target,...sourse); 合并后会改变目标对象target的值 \n因此:  mergePerson(b)  ==  Object.assign(b, a) == b;\n</pre><p><br></p><h3><span style="color: rgb(255, 255, 255);">5.使用Array.prototype.map()和Function.prototype.apply()将每个函数应用于给定的参数。(over)</span></h3><pre class="ql-syntax" spellcheck="false">const over = (...fns) =&gt; (...args) =&gt; fns.map(fn =&gt; fn.apply(null, args));\nconst minMax = over(Math.min, Math.max);\nminMax(1, 2, 3, 4, 5); // [1,5]\n</pre>'
        //   },
        //   {
        //     subArticles: [],
        //     date: "1562036769258",
        //     visits: 8,
        //     _id: "5d1acc3158c4932ec460b69b",
        //     isCatelog: 0,
        //     name: "( 一 ) 阻塞与非阻塞IO",
        //     parentId: "5d0b39a0f37b4169988b67e5",
        //     __v: 0,
        //     content:
        //       '<h1><span style="color: rgb(255, 255, 255);">前言</span></h1><p><span style="color: rgb(255, 255, 255);">绝大多数人堆Node的讨论都把关注点放在了其处理高并发的能力上，相比其他同类解决方案，Node给开发者提供了构建高性能网络应用的强大能力，当然，我们需要知道Node内部所作出的权衡，以及用Node构建的应用之所以性能好的原因。</span></p><h1><span style="color: rgb(255, 255, 255);">共享状态并发</span></h1><p><span style="color: rgb(255, 255, 255);">Node 为 Javascript 引入了一个复杂的概念，这在浏览器中从未有过：</span><strong style="color: rgb(255, 255, 255);">共享状态的并发</strong><span style="color: rgb(255, 255, 255);">。</span></p><p><span style="color: rgb(255, 255, 255);">首先，什么是并发？</span><strong style="color: rgb(255, 255, 255);">并发</strong><span style="color: rgb(255, 255, 255);">，在操作系统中，是指一个时间段中有几个程序都处于已启动运行到运行完毕之间，且这几个程序都是在同一个处理机上运行，但任一个时刻点上只有一个程序在处理机上运行。通俗的说，当我正在吃饭，这时来了个电话，我放下碗筷去接电话了，接完电话继续来吃饭，这就是并发（若边吃饭边接电话则叫作并行）即在同一时间线上某个时间点上只能发生一件事件（与事件是否结束无关）。</span></p><p><span style="color: rgb(255, 255, 255);">这个时间线我们可以叫它为</span><strong style="color: rgb(255, 255, 255);">进程。</strong><span style="color: rgb(255, 255, 255);">进程（英语：Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础。</span></p><p><span style="color: rgb(255, 255, 255);">这两个事件我们叫它为</span><strong style="color: rgb(255, 255, 255);">线程。</strong><span style="color: rgb(255, 255, 255);">线程（英语：Thread）是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位。一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并发多个线程，每条线程并行执行不同的任务。</span></p><p><span style="color: rgb(255, 255, 255);">那什么是共享状态并发？来看个例子：</span></p><pre class="ql-syntax" spellcheck="false">var status = [\'status1\',\'status2\',\'status3\'];  //将状态存在数组中\nfunction changeStatus() {\n  var statusData = status; \n  status = [];    //将所有状态置空\n  return statusData; \n}\n</pre><p><span style="color: rgb(255, 255, 255);">假设我们现在向node服务器发起了两次状态的请求，会第一次请求会得到完整的三个状态，第二次请求则得不到任何状态。原因就在于node采用用了一个长期运行的进程（每个请求一个线程），当changeStatus函数被调用多次时，作用域中的变量不受其影响。其永远共享作用域中的变量。（而在PHP等语言中类似的代码，若我们请求两次，则两次都会输出完整的状态，由于Apache会产出多个线程，每次都会刷新状态）。如下图所示，所有的请求都在一个进程中。</span></p><p><span style="color: rgb(255, 255, 255);"><img src="http://39.108.55.93:3000/public/node线程.png"></span></p><h1><span style="color: rgb(255, 255, 255);">阻塞与非阻塞IO</span></h1><p><span style="color: rgb(255, 255, 255);">所谓IO即指input/output输入输出。那么什么是非阻塞IO？看个例子：</span></p><pre class="ql-syntax" spellcheck="false">//node\nconsole.log(\'Hello\');\nsetTimeout(function(){\n  console.log(\'World\');\n},5000)\nconsole.log(\'Bye\');\n//这段脚本会输出\n//Hello  Bye  World \n</pre><p><span style="color: rgb(255, 255, 255);">由于Node.js使用了事件轮询（下面会详细介绍），这里的setTimeout是非阻塞的。采用了事件轮询意味着什么？ </span><strong style="color: rgb(255, 255, 255);">在本质上来说，Node会先注册事件，随后不停的询问内核这些事件是否已经分发，当事件分发时，对应的回调函数就会被触发，然后继续执行下去。所谓阻塞IO，当事件被分发时，不会继续执行之后的任何代码。</strong><span style="color: rgb(255, 255, 255);">看上去阻塞与非阻塞与我们经常挂在嘴边的同步和异步十分相像，但是二者有本质的区别：</span></p><p><span style="color: rgb(255, 255, 255);">它们的修饰对象是不同的。</span><strong style="color: rgb(255, 255, 255);">阻塞和非阻塞是指进程访问的数据如果尚未就绪，进程是否需要等待</strong><span style="color: rgb(255, 255, 255);">，简单说这相当于函数内部的实现区别，也就是未就绪时是直接返回还是等待就绪。</span></p><p><span style="color: rgb(255, 255, 255);">而</span><strong style="color: rgb(255, 255, 255);">同步和异步是指访问数据的机制</strong><span style="color: rgb(255, 255, 255);">,同步一般指主动请求并等待I/O操作完毕的方式,当数据就绪后在读写的时候必须阻塞,异步则指主动请求数据后便可以继续处理其它任务,随后等待I/O,操作完毕的通知,这可以使进程在数据读写时也不阻塞。</span></p><h1><span style="color: rgb(255, 255, 255);">单线程</span></h1><p><span style="color: rgb(255, 255, 255);">Node是单线程的。在没有第三方模块的帮助下是无法改变这一事实的。为了证明这个例子，以及其和事件轮询之间的关系，我们来看一个例子：</span></p><pre class="ql-syntax" spellcheck="false">var start = Date.now()\nsetTimeout(function () {\n  console.log(Date.now() - start)\n  for (var i = 0; i &lt; 10000000000; i++) {}\n}, 1000)\nsetTimeout(function () {\n  console.log(Date.now() - start)\n}, 2000)\n\n// 1004\n// 14034\n</pre><p><span style="color: rgb(255, 255, 255);">打印出来的时间与我们料想的会有所差异，究其原因是事件轮询被JavaScript代码阻塞了，当定时任务分发时，会执行回调函数，由于回调函数需要执行很长一段时间，所以下个事件轮询执行的执行就远远超过了2秒，因此JavaScript的setTimeout并不能严格遵守时钟设置。</span></p><p><span style="color: rgb(255, 255, 255);">这种行为方式并不合理，事件轮询是Node IO的基础核心，既然超时可以延迟，那http及其他形式的IO均可如此，这也就意味着，Http服务器每秒的请求数量变少了，效率也降低了。正因如此，许多优秀的Node模块都是非阻塞的，执行任务也都采用了异步的方式。</span></p><p><span style="color: rgb(255, 255, 255);">既然是单线程，也就是在同个时间点只能执行一个函数，</span><strong style="color: rgb(255, 255, 255);">那么node是怎么处理高并发的</strong><span style="color: rgb(255, 255, 255);">？（用node书写的简单服务器每秒可以处理上千个请求）。为了搞清楚这个问题，我们首先要了解堆栈的概念：</span></p><p><span style="color: rgb(255, 255, 255);">当V8首次调用一个函数的时候，会创建一个众所周知的调用堆栈，或者称为执行堆栈，当该函数又去调用另外一个函数的话，V8就会把它添加到调用堆栈上：</span></p><pre class="ql-syntax" spellcheck="false">http.createServer(function (){\n  a();\n});\nfunction b(){};\n</pre><p><span style="color: rgb(255, 255, 255);">一旦http请求到达服务器，Node就会分发一个通知。最终，回调函数会被执行，并且调用堆栈变为a &gt; b。而由于Node是运行在单线程的环境中，所以，当调用栈展开的时候，Node就无法处理其他的客户端或者HTTP请求了。也就是说，实际上Node的最大并发量为1。事实上Node并不提供真正的并行操作，因为这样需要引入更多的并行执行线程。</span></p><p><span style="color: rgb(255, 255, 255);">关键在于，在调用堆栈执行非常快的情况下，同一时刻你无需处理多个请求，这也是为何说V8搭配非阻塞IO是最好的组合：V8执行Javascript的速度非常的快，非阻塞IO确保了单线程执行时，不会因为有数据库的访问或者硬盘访问等操作而导致被挂起。</span></p><h1><span style="color: rgb(255, 255, 255);">错误处理</span></h1><p><span style="color: rgb(255, 255, 255);">首先，Node应用依托在一个拥有大量共享状态的大进程中。也就是说，在一个HTTP请求中，如果某个回调函数发生了错误，整个进程都会遭殃：</span></p><pre class="ql-syntax" spellcheck="false">var http = require(\'http\');\nhttp.createServer(function (){\n  throw new Error(\'错误不会被捕获\')\n}).listen(3000)\n</pre><p><span style="color: rgb(255, 255, 255);">因为错误未被捕获，若访问Web服务器，进程就会崩溃。Node之所以这样处理是因为，在发生未被捕获的错误时，进程的状态就不确定了，之后就可能无法正常工作了， 并且如果始终不处理错误的话，就会一直抛出意料之外的错误。这样会使得程序很难调试。</span></p><h1><span style="color: rgb(255, 255, 255);">堆栈追踪</span></h1><p><span style="color: rgb(255, 255, 255);">在JavaScript中，当错误发生的时候，在错误信息中可以看到一系列的函数调用，这称为堆栈追踪，举个例子：</span></p><pre class="ql-syntax" spellcheck="false">function c(){\n  b();\n}\nfunction b(){\n  a();\n}\nfunction a(){\n  throw new Error(\'here\');\n}\n</pre><p><span style="color: rgb(255, 255, 255);">运行上述代码可以看到堆栈追踪信息如下图所示：</span></p><p><br></p><p><span style="color: rgb(255, 255, 255);"><img src="http://39.108.55.93:3000/public/node错误追踪.jpg"></span></p><p><br></p><p><span style="color: rgb(255, 255, 255);">在上图中可以清晰的看到导致错误发生的函数调用路径，那么如果我们引入事件轮询会怎么样？</span></p><pre class="ql-syntax" spellcheck="false">// 例子1\nfunction c(){\n  b();\n}\nfunction b(){\n  a();\n}\nfunction a(){\n  setTimeout(function(){\n    throw new Error(\'here\');\n },10);\n}\n\n//例子2\ntry{\n  setTimeout(function (){\n    throw new Error(\'here\');\n},10);\n} catch (e) { }\n</pre><p><span style="color: rgb(255, 255, 255);">执行上面这部分的代码会发现堆栈信息中有价值的信息就丢失了（如下图所示）。由于异步特性，错误的抛出发生在function a()以及try{}catch{}调用结束以后，所以该异常不会被捕获，这也就是为什么Node中每一步都需要正确进行错误处理的原因了，一旦遗漏，你就会发现发生了错误以后很难追踪了。</span></p><p><br></p><p><span style="color: rgb(255, 255, 255);"><img src="http://39.108.55.93:3000/public/node错误追踪2.jpg"></span></p><p><br></p><h1><span style="color: rgb(255, 255, 255);">错误处理方法</span></h1><h2><span style="color: rgb(255, 255, 255);">uncaughtException</span></h2><p><span style="color: rgb(255, 255, 255);"> 如果我们添加了uncaughtException处理器，这个时候，当意料之外的错误抛出的时候，进程不会中断，并且之后的事都在我们的掌握之中：</span></p><pre class="ql-syntax" spellcheck="false">process.on(\'uncaughtException\',function(err){\n   console.log(err);\n   process.exit(1);  //手动退出\n})\n</pre><p><span style="color: rgb(255, 255, 255);">很遗憾的是，保证uncaughtException不影响整个进程的健康运转是不可能的。当 Node 抛出uncaughtException&nbsp;异常时就会丢失当前环境的堆栈（上面提到过），导致 Node 不能正常进行内存回收。也就是说，每一次uncaughtException都有可能导致内存泄露。</span></p><h1><span style="color: rgb(255, 255, 255);">express中异常的处理</span></h1><pre class="ql-syntax" spellcheck="false">app.get(\'/\', function (req, res, next) { // 总是接收 next 参数\n    fs.readFile(\'./abc\',, function (err, results) {\n        // 不要这样做\n        if (err) throw err;\n\n        // 应该将 err 传递给 errorHandler 处理\n        if (err) return next(err);\n        // 当调用 next 的时候，如果传递了参数，则直接往后找到带有 四个参数的应用程序级别中间件\n        // 当发生错误的时候，我们可以调用 next 传递错误对象\n        // 然后就会被全局错误处理中间件匹配到并处理之\n    });\n});\n\napp.use(function (err, req, res, next) {\n // 带有四个参数的 middleware 专门用来处理异常\n    res.render(500, err.stack);\n});\n</pre>',
        //     parentCatelog: "Node.js 学习札记"
        //   }
        // ];
        //   this.updateTimeline = data;
        //         this.updateTimeline.forEach(item =>
        //           item.content ? (item.content = validateContent(item.content)) : ""
        //         ); //截取文章第一个p标签
      getArticleTimeline({
        params: this.pageConfig
      })
        .then(res => {
          if (res) {
            this.updateTimeline = res.data.data;
            this.updateTimeline.forEach(item =>
              item.content ? (item.content = validateContent(item.content)) : ""
            ); //截取文章第一个p标签
            this.pageConfig.total = res.data.total;
            this.contentLoading = false;
          }
        })
        .catch(err => {
          this.contentLoading = false;
          console.log(err);
        });
    },
    getBasicInfo() {
      getUser({})
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pageConfig.pageSize = val;
      this.getTimeline();
    },
    handleCurrentChange(val) {
      this.pageConfig.pageNum = val;
      this.getTimeline();
    }
  },
  watch: {},
  computed: {},
  components: {
    categoryCom
  }
};
</script>
<style lang="scss" scoped>
.article-categories {
  text-align: left;
  span {
    display: inline-block;
    margin: 20px 0;
    width: 100%;
    text-align: center;
    font-size: 20px;
  }
}

.main-home-body {
  border-radius: 3px;
  background: url("../../assets/bg-juren-04.jpg") no-repeat center center;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  overflow: auto;
  .main-home-body-wrap {
    margin: 100px auto;
    .main-home-body-center {
      padding-top: 20px;
      min-height: 500px;
      width: 800px;
      min-height: 500px;
      position: relative;
      .content {
        height: 100%;
        width: 100%;
        margin-bottom: 20px;
        color: #fff;
        .content-header {
          height: 110px;
          padding: 20px 0;
          box-sizing: border-box;
          h1 {
            font-size: 30px;
            font-weight: 400;
            cursor: pointer;
          }
          .content-header-tag {
            height: 30px;
            display: flex;
            box-sizing: border-box;
            margin: 10px 0;
            font-size: 14px;
            li {
              line-height: 30px;
            }
            li:not(:last-child) {
              //选中非最后一个元素给与"|"
              &:after {
                content: "|";
                display: inline-block;
                margin-right: 12px;
                position: relative;
                left: 3px;
              }
            }
          }
        }
        .content-body {
          text-align: justify;
          line-height: 20px;
          letter-spacing: 1.5px; //对字母 汉子起作用 (word-spacing对单词起作用)
        }
        .content-footer {
            margin-top: 20px;
            height: 40px;
            a{
              color: #FFF;
            }
            span {
              cursor: pointer;
              i {
                font-size: 14px;
              }
            }
          }
      }
      .content-pagination {
        margin: 10px auto;
      }
    }
  }
}
</style>
