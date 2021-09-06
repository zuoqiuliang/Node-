const axios=require('axios');
const cheerio=require('cheerio');
const Book=require('../models/Book')

// async function fetchBooks(){//获取豆瓣页面源码
//  const res= await   axios.get(
//         'https://book.douban.com/latest',

//     )
//     // console.log(res.data)
//     return res.data
// }



//  async function getBookListLinks(){//根据豆瓣页面HTML获得一个书籍链接详情页列表
//    const html= await fetchBooks();
//    let $= cheerio.load(html)
//   const lis= $('#content .grid-12-12 li a')
//   const links= lis.map((i,ele)=>{
//     return ele.attribs['href'] 
//   }).get()
//   return links
// }




// async function getBookDetail(url){
//   const html= await axios.get(url)
//    const $= cheerio.load(html.data);
//    const name=$('h1').text().trim()
//     const imgurl=$('#mainpic .nbg img').attr('src')
//    const spans= $('#info span.pl');
//    const authorSpan= spans.filter((i,ele)=>{
//        return $(ele).text().includes('作者')
//    })
//    const author=authorSpan.next('a').text()
//    const publishSpan= spans.filter((i,ele)=>{
//         return $(ele).text().includes('出版年')
//     })
//     const publishDate=publishSpan[0].nextSibling.nodeValue
//         console.log(name,imgurl,author,publishDate)


//         return{
//             name,
//             imgurl,
//             author,
//             publishDate
//         }
// }
    






// async function getAllBookInfo(){//得到书籍列表
//   const links=  await getBookListLinks();
//  const proms= links.map((item)=>{
//       return getBookDetail(item)
//   })
//   return Promise.all(proms)
// }


// getAllBookInfo().then(res=>{
//     console.log(res)
    
// })


const bookArr= [ { name: '清洁女工手册',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33971645.jpg',
    author: '[美]露西亚·伯林',
    publishDate: ' 2021-9' },
  { name: '清洁女工手册',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33971645.jpg',
    author: '[美]露西亚·伯林',
    publishDate: ' 2021-9' },
  { name: '焦虑的人',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33951431.jpg',
    author: '弗雷德里克·巴克曼',
    publishDate: ' 2021-8' },
  { name: '焦虑的人',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33951431.jpg',
    author: '弗雷德里克·巴克曼',
    publishDate: ' 2021-8' },
  { name: '生命式',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33966199.jpg',
    author: '[日] 村田沙耶香',
    publishDate: ' 2021-8' },
  { name: '生命式',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33966199.jpg',
    author: '[日] 村田沙耶香',
    publishDate: ' 2021-8' },
  { name: '其主之声',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33925045.jpg',
    author: '[波] 斯坦尼斯瓦夫·莱姆',
    publishDate: ' 2021-8' },
  { name: '其主之声',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33925045.jpg',
    author: '[波] 斯坦尼斯瓦夫·莱姆',
    publishDate: ' 2021-8' },
  { name: '馆子',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33961214.jpg',
    author: '贺伊曼',
    publishDate: ' 2021-8' },
  { name: '馆子',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33961214.jpg',
    author: '贺伊曼',
    publishDate: ' 2021-8' },
  { name: '埃及众神',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33967154.jpg',
    author: '[法] 拉斐尔·马丁',
    publishDate: ' 2021-8' },
  { name: '埃及众神',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33967154.jpg',
    author: '[法] 拉斐尔·马丁',
    publishDate: ' 2021-8' },
  { name: '扎根',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33952383.jpg',
    author: '韩东',
    publishDate: ' 2021-8' },
  { name: '扎根',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33952383.jpg',
    author: '韩东',
    publishDate: ' 2021-8' },
  { name: '如首无作祟之物',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33947872.jpg',
    author: '[日] 三津田信三',
    publishDate: ' 2021-8' },
  { name: '如首无作祟之物',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33947872.jpg',
    author: '[日] 三津田信三',
    publishDate: ' 2021-8' },
  { name: '耶稣之死',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33984209.jpg',
    author: '[南非] J.M.库切',
    publishDate: ' 2021-8-10' },
  { name: '耶稣之死',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33984209.jpg',
    author: '[南非] J.M.库切',
    publishDate: ' 2021-8-10' },
  { name: '没有个性的人',
    imgurl: 'https://img3.doubanio.com/view/subject/s/public/s33974950.jpg',
    author: '[奥] 罗伯特·穆齐尔',
    publishDate: ' 2021-8' },
  { name: '没有个性的人',
    imgurl: 'https://img3.doubanio.com/view/subject/s/public/s33974950.jpg',
    author: '[奥] 罗伯特·穆齐尔',
    publishDate: ' 2021-8' },
  { name: '这么多年',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33962561.jpg',
    author: '八月长安',
    publishDate: ' 2021-8-14' },
  { name: '这么多年',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33962561.jpg',
    author: '八月长安',
    publishDate: ' 2021-8-14' },
  { name: '红运',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33957651.jpg',
    author: '[越南]武重奉',
    publishDate: ' 2021-8' },
  { name: '红运',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33957651.jpg',
    author: '[越南]武重奉',
    publishDate: ' 2021-8' },
  { name: '煞风景的早间首班车',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33972831.jpg',
    author: '[日] 青崎有吾',
    publishDate: ' 2021-9' },
  { name: '煞风景的早间首班车',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33972831.jpg',
    author: '[日] 青崎有吾',
    publishDate: ' 2021-9' },
  { name: '外乡人',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33968623.jpg',
    author: '[西]奥尔加·梅丽诺',
    publishDate: ' 2021-8' },
  { name: '外乡人',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33968623.jpg',
    author: '[西]奥尔加·梅丽诺',
    publishDate: ' 2021-8' },
  { name: '玻璃边界',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33961803.jpg',
    author: '[墨]卡洛斯·富恩特斯',
    publishDate: ' 2021-8' },
  { name: '玻璃边界',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33961803.jpg',
    author: '[墨]卡洛斯·富恩特斯',
    publishDate: ' 2021-8' },
  { name: '盘上之夜',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33951125.jpg',
    author: '[日]宫内悠介',
    publishDate: ' 2021-8' },
  { name: '盘上之夜',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33951125.jpg',
    author: '[日]宫内悠介',
    publishDate: ' 2021-8' },
  { name: '看你一眼就会笑',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33941284.jpg',
    author: '丘汉林',
    publishDate: ' 2021-8' },
  { name: '看你一眼就会笑',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33941284.jpg',
    author: '丘汉林',
    publishDate: ' 2021-8' },
  { name: '喂——出来',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33955419.jpg',
    author: '(日) 星新一',
    publishDate: ' 2021-7' },
  { name: '喂——出来',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33955419.jpg',
    author: '(日) 星新一',
    publishDate: ' 2021-7' },
  { name: '鳄鱼的黄眼睛',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33935484.jpg',
    author: '[法]  卡特琳娜·班科尔',
    publishDate: ' 2021-7' },
  { name: '鳄鱼的黄眼睛',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33935484.jpg',
    author: '[法]  卡特琳娜·班科尔',
    publishDate: ' 2021-7' },
  { name: '月光武士',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33937413.jpg',
    author: '[英国] 虹影',
    publishDate: ' 2021-7-1' },
  { name: '月光武士',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33937413.jpg',
    author: '[英国] 虹影',
    publishDate: ' 2021-7-1' },
  { name: '金瓶梅的艺术',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33960304.jpg',
    author: '孙述宇',
    publishDate: ' 2021-8' },
  { name: '金瓶梅的艺术',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33960304.jpg',
    author: '孙述宇',
    publishDate: ' 2021-8' },
  { name: '祥瑞',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33957074.jpg',
    author: '张向荣',
    publishDate: ' 2021-8' },
  { name: '祥瑞',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33957074.jpg',
    author: '张向荣',
    publishDate: ' 2021-8' },
  { name: '东京绮梦',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33977007.jpg',
    author: '[荷兰] 伊恩·布鲁玛',
    publishDate: ' 2021-8' },
  { name: '东京绮梦',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33977007.jpg',
    author: '[荷兰] 伊恩·布鲁玛',
    publishDate: ' 2021-8' },
  { name: '遗言中的隋唐女性世界',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33977004.jpg',
    author: '么振华',
    publishDate: ' 2021-9' },
  { name: '遗言中的隋唐女性世界',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33977004.jpg',
    author: '么振华',
    publishDate: ' 2021-9' },
  { name: '美国的反智传统',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33956727.jpg',
    author: '理查德·霍夫施塔特',
    publishDate: ' 2021-8' },
  { name: '美国的反智传统',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33956727.jpg',
    author: '理查德·霍夫施塔特',
    publishDate: ' 2021-8' },
  { name: '行走的柠檬',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33941589.jpg',
    author: '[英] 海伦娜·阿特利',
    publishDate: ' 2021-8' },
  { name: '行走的柠檬',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33941589.jpg',
    author: '[英] 海伦娜·阿特利',
    publishDate: ' 2021-8' },
  { name: '太阳与铁',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33936886.jpg',
    author: '[日]三岛由纪夫',
    publishDate: ' 2021-8' },
  { name: '太阳与铁',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33936886.jpg',
    author: '[日]三岛由纪夫',
    publishDate: ' 2021-8' },
  { name: '李诞脱口秀工作手册',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33968562.jpg',
    author: '李诞',
    publishDate: ' 2021-8-20' },
  { name: '李诞脱口秀工作手册',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33968562.jpg',
    author: '李诞',
    publishDate: ' 2021-8-20' },
  { name: '寒门子弟上大学',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33948415.jpg',
    author: '[美]安东尼·亚伯拉罕·杰克',
    publishDate: ' 2021-8' },
  { name: '寒门子弟上大学',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33948415.jpg',
    author: '[美]安东尼·亚伯拉罕·杰克',
    publishDate: ' 2021-8' },
  { name: '书店里的七种人',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33956113.jpg',
    author: '[英]肖恩·白塞尔',
    publishDate: ' 2021-9' },
  { name: '书店里的七种人',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33956113.jpg',
    author: '[英]肖恩·白塞尔',
    publishDate: ' 2021-9' },
  { name: '竟然是真的',
    imgurl: 'https://img3.doubanio.com/view/subject/s/public/s33963820.jpg',
    author: '刘天昭',
    publishDate: ' 2021-8' },
  { name: '竟然是真的',
    imgurl: 'https://img3.doubanio.com/view/subject/s/public/s33963820.jpg',
    author: '刘天昭',
    publishDate: ' 2021-8' },
  { name: '公共卫生史',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33953927.jpg',
    author: '[美国]乔治·罗森',
    publishDate: ' 2021-8' },
  { name: '公共卫生史',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33953927.jpg',
    author: '[美国]乔治·罗森',
    publishDate: ' 2021-8' },
  { name: '大学的历史',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33956266.jpg',
    author: '克里斯托夫 • 夏尔勒',
    publishDate: ' 2021-8' },
  { name: '大学的历史',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33956266.jpg',
    author: '克里斯托夫 • 夏尔勒',
    publishDate: ' 2021-8' },
  { name: '东欧：草原边疆1500—1800',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33934085.jpg',
    author: '[美]威廉·麦克尼尔',
    publishDate: ' 2021-8' },
  { name: '东欧：草原边疆1500—1800',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33934085.jpg',
    author: '[美]威廉·麦克尼尔',
    publishDate: ' 2021-8' },
  { name: '精神病院里的正常人',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33984154.jpg',
    author: '[美]苏珊娜•卡哈兰',
    publishDate: ' 2021-7-30' },
  { name: '精神病院里的正常人',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33984154.jpg',
    author: '[美]苏珊娜•卡哈兰',
    publishDate: ' 2021-7-30' },
  { name: '小说六讲',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33966969.jpg',
    author: '王安忆',
    publishDate: ' 2021-8' },
  { name: '小说六讲',
    imgurl: 'https://img1.doubanio.com/view/subject/s/public/s33966969.jpg',
    author: '王安忆',
    publishDate: ' 2021-8' },
  { name: '古画新品录',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33938081.jpg',
    author: '黄小峰',
    publishDate: ' 2021-7' },
  { name: '古画新品录',
    imgurl: 'https://img2.doubanio.com/view/subject/s/public/s33938081.jpg',
    author: '黄小峰',
    publishDate: ' 2021-7' },
  { name: '鹤见俊辅传',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33924544.jpg',
    author: '[日]黑川创',
    publishDate: ' 2021-7' },
  { name: '鹤见俊辅传',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33924544.jpg',
    author: '[日]黑川创',
    publishDate: ' 2021-7' },
  { name: '六朝文明',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33889246.jpg',
    author: '[美] 丁爱博（Albert E. Dien）',
    publishDate: ' 2021-7' },
  { name: '六朝文明',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33889246.jpg',
    author: '[美] 丁爱博（Albert E. Dien）',
    publishDate: ' 2021-7' },
  { name: '并不想说坏话！无人敢评的吉卜力功过',
    imgurl: 'https://img9.doubanio.com/view/subject/s/public/s33924525.jpg',
    author: '[日]押井守',
    publishDate: ' 2021-7' } ]

    Book.bulkCreate(bookArr)