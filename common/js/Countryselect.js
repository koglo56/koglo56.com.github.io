/**
 * Created by Lwr on 2016/11/15.
 */
/* *
 * 全局空间 Country
 * */
var Country = {};
/* *
 * 静态方法集
 * @name _m
 * */
Country._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Country._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Country._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Country._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */
Country.allCity=[
    {nameCn:"美国东部",nameEn:"Eastern United States",codeId:"a40df46906474798ab577eef719d8ea3",nationalCode:"U2",pinYin:"Eastern United States",isHot:true},
    {nameCn:"美国西部",nameEn:"Western United States",codeId:"382027173ae34b2c8013ad1863427ebc",nationalCode:"U1",pinYin:"Western United States",isHot:true},
    {nameCn:"澳大利亚",nameEn:"Australia",codeId:"2a879e52b6dd4d9aa9fd0d0d27e56bff",nationalCode:"AU",pinYin:"Australia",isHot:true},
    {nameCn:"加拿大",nameEn:"Canada",codeId:"a1f334c3d80940da8ba7f322a6bf45ab",nationalCode:"CA",pinYin:"Canada",isHot:true},
    {nameCn:"瑞士",nameEn:"Switzerland",codeId:"5aa5dfe0f9b54be2b3c91de331cd7f49",nationalCode:"CH",pinYin:"Switzerland",isHot:true},
    {nameCn:"德国",nameEn:"Germany",codeId:"4425f966489441e7abd9f4ec6a85ac08",nationalCode:"DE",pinYin:"Germany",isHot:true},
    {nameCn:"西班牙",nameEn:"Spain",codeId:"322a26edb3f54514b72c5aa2c9448c69",nationalCode:"ES",pinYin:"Spain",isHot:true},
    {nameCn:"法国",nameEn:"France",codeId:"22041c650969415b9a116f7ef7c87766",nationalCode:"FR",pinYin:"France",isHot:true},
    {nameCn:"英国",nameEn:"United Kingdom",codeId:"eeced0205c0c4886809f12f860c38241",nationalCode:"GB",pinYin:"United Kingdom",isHot:true},
    {nameCn:"日本",nameEn:"Japan",codeId:"a81dc56517b841bfa18c730c6713efd3",nationalCode:"JP",pinYin:"Japan",isHot:false},
    {nameCn:"马来西亚",nameEn:"Malaysia",codeId:"827e27e5685740e382ed6762fd51ff1e",nationalCode:"MY",pinYin:"Malaysia",isHot:false},
    {nameCn:"荷兰",nameEn:"Netherlands",codeId:"1872352c3bd2473bab41e12432d5ea85",nationalCode:"NL",pinYin:"Netherlands",isHot:true},
    {nameCn:"俄罗斯",nameEn:"Russia",codeId:"f277d49674ea4de184229f665b572f2c",nationalCode:"RU",pinYin:"Russia",isHot:true},
    {nameCn:"瑞典",nameEn:"Sweden",codeId:"9176c59c99484009bae0ff18fc367bee",nationalCode:"SE",pinYin:"Sweden",isHot:true},
    {nameCn:"新加坡",nameEn:"Singapore",codeId:"9120374e817b46eba13a8d6ab19b96e5",nationalCode:"SG",pinYin:"Singapore",isHot:false},
    {nameCn:"特立尼达和多巴哥",nameEn:"Trinidad and Tobago",codeId:"bbe29a2c54434afb9143ce37c23f1aa3",nationalCode:"TT",pinYin:"Trinidad and Tobago",isHot:false},
    {nameCn:"土耳其",nameEn:"Turkey",codeId:"2be6d2567cd74bd081c26445ccb1650b",nationalCode:"TR",pinYin:"Turkey",isHot:false},
    {nameCn:"汤加",nameEn:"Tonga",codeId:"4b4eb586be2649adae03caf45c92dd22",nationalCode:"TO",pinYin:"Tonga",isHot:false},
    {nameCn:"突尼斯",nameEn:"Tunisia",codeId:"363c6ff3cc4c41908cc71d7a1d9f14d2",nationalCode:"TN",pinYin:"Tunisia",isHot:false},
    {nameCn:"土库曼斯坦",nameEn:"Turkmeinistan",codeId:"2810bea91bb0430fbc89f8965a87a024",nationalCode:"TM",pinYin:"Turkmeinistan",isHot:false},
    {nameCn:"东帝汶",nameEn:"East Timor",codeId:"8dc2c1655976441a9f33873549a944d0",nationalCode:"TL",pinYin:"East Timor",isHot:false},
    {nameCn:"塔吉克斯坦",nameEn:"Tajikistan",codeId:"ca87439e46bb4c20b017b6ea5e2232b3",nationalCode:"TJ",pinYin:"Tajikistan",isHot:false},
    {nameCn:"泰国",nameEn:"Thailand",codeId:"4997740ebcfc42869a7e88547e0b4dcc",nationalCode:"TH",pinYin:"Thailand",isHot:false},
    {nameCn:"多哥",nameEn:"Togo",codeId:"f3a1ae0efd2c40268196df6ef142b27a",nationalCode:"TG",pinYin:"Togo",isHot:false},
    {nameCn:"乍得",nameEn:"Chad",codeId:"2e0b3c5fffc142a2b194eb9b0921a663",nationalCode:"TD",pinYin:"Chad",isHot:false},
    {nameCn:"特克斯和凯科斯群岛",nameEn:"Turks And Caicos Islands",codeId:"d61a40f1d461486995cb6c9113e0fe34",nationalCode:"TC",pinYin:"Turks And Caicos Islands",isHot:false},
    {nameCn:"斯威士兰",nameEn:"Swaziland",codeId:"6596f930f6aa44f69452e842321d59ae",nationalCode:"SZ",pinYin:"Swaziland",isHot:false},
    {nameCn:"悉尼港",nameEn:"SYDNEY",codeId:"b1fbbf7c90a740e3bdf8e1a5a96770f1",nationalCode:"SYD",pinYin:"SYDNEY",isHot:false},
    {nameCn:"叙利亚",nameEn:"Syria",codeId:"176b915da83b4925ab8cb5ad16dd2a5c",nationalCode:"SY",pinYin:"Syria",isHot:false},
    {nameCn:"萨尔瓦多",nameEn:"El Salvador",codeId:"359fb06e26bd4114a5c0bb169ab7355a",nationalCode:"SV",pinYin:"El Salvador",isHot:false},
    {nameCn:"苏格兰",nameEn:"Scotland",codeId:"7c0bdc28c3e14adeb14647e1a678a44d",nationalCode:"STD",pinYin:"Scotland",isHot:false},
    {nameCn:"圣多美和普林西比",nameEn:"Sao Tome and Principe",codeId:"43ba9869b20c4521b5aad653015b70b3",nationalCode:"ST",pinYin:"Sao Tome and Principe",isHot:false},
    {nameCn:"苏里南",nameEn:"Suriname",codeId:"19958df878534f92851883bb62d08038",nationalCode:"SR",pinYin:"Suriname",isHot:false},
    {nameCn:"塞班岛",nameEn:"Saipan",codeId:"b7029868608d4ede97354b2ce9bcd2db",nationalCode:"SP",pinYin:"Saipan",isHot:false},
    {nameCn:"索马里",nameEn:"Somalia",codeId:"f80f806bc1be4175bbaa2ac2184b2762",nationalCode:"SO",pinYin:"Somalia",isHot:false},
    {nameCn:"塞内加尔",nameEn:"Senegal",codeId:"7143ae8cf2e04eb98dead7f7561ee896",nationalCode:"SN",pinYin:"Senegal",isHot:false},
    {nameCn:"索马里兰",nameEn:"Somaliland, Rep of (North Somalia)",codeId:"ee5338e50ec9467f99aa357e6c41f705",nationalCode:"SML",pinYin:"Somaliland, Rep of (North Somalia)",isHot:false},
    {nameCn:"圣马力诺",nameEn:"San Marino",codeId:"e729dd7ccdb74a899700e2218feef700",nationalCode:"SM",pinYin:"San Marino",isHot:false},
    {nameCn:"塞拉利昂",nameEn:"Sierra Leone",codeId:"b5624f6177f04c97a43d4a0c01506b26",nationalCode:"SL",pinYin:"Sierra Leone",isHot:false},
    {nameCn:"斯洛伐克",nameEn:"Slovakia",codeId:"5997384a7b2f4db98c4313fa141d0c20",nationalCode:"SK",pinYin:"Slovakia",isHot:false},
    {nameCn:"斯洛文尼亚",nameEn:"Slovenia",codeId:"305368faef4940ef9e15e8ea334a45f3",nationalCode:"SI",pinYin:"Slovenia",isHot:false},
    {nameCn:"苏丹",nameEn:"SUDAN",codeId:"8f1db65ab1214eab80aef1bfee2035cd",nationalCode:"SD",pinYin:"SUDAN",isHot:false},
    {nameCn:"塞舌尔",nameEn:"Seychelles",codeId:"828d336218934bcb8d907ad7bb0716d1",nationalCode:"SC",pinYin:"Seychelles",isHot:false},
    {nameCn:"所罗门群岛",nameEn:"Soloman Islands",codeId:"35602c8d92e04bbabaad5adb1b0f8fe2",nationalCode:"SB",pinYin:"Soloman Islands",isHot:false},
    {nameCn:"沙特阿拉伯",nameEn:"Saudi Arabia",codeId:"3ed1b938fe9b4aa0bd601aef5f24e2ee",nationalCode:"SA",pinYin:"Saudi Arabia",isHot:false},
    {nameCn:"卢旺达",nameEn:"Rwanda",codeId:"d26227e9e388452685cc854e37a3b427",nationalCode:"RW",pinYin:"Rwanda",isHot:false},
    {nameCn:"塞尔维亚",nameEn:"SERBIA, REPUBLIC OF",codeId:"14c3f00139c84f0a845caeecf9670811",nationalCode:"RS",pinYin:"SERBIA, REPUBLIC OF",isHot:false},
    {nameCn:"罗马尼亚",nameEn:"Romania",codeId:"ed9893106b0742beab5a9b22fd38d062",nationalCode:"RO",pinYin:"Romania",isHot:false},
    {nameCn:"留尼旺",nameEn:"Reunion",codeId:"3630b1d9c9fe4d789a35512c648eab4a",nationalCode:"RE",pinYin:"Reunion",isHot:false},
    {nameCn:"卡塔尔",nameEn:"Qatar",codeId:"c93d8d5b7168464bbe71cf4ad8c33143",nationalCode:"QA",pinYin:"Qatar",isHot:false},
    {nameCn:"巴拉圭",nameEn:"Paraguay",codeId:"445c5d521f6a43ceafb8669b31421a9e",nationalCode:"PY",pinYin:"Paraguay",isHot:false},
    {nameCn:"葡萄牙",nameEn:"Portugal",codeId:"852834ae9c2b4e09ab3f254c1f568590",nationalCode:"PT",pinYin:"Portugal",isHot:false},
    {nameCn:"波多黎各",nameEn:"Puerto Rico",codeId:"3734a74ed8fe43d78df22e8039fb524f",nationalCode:"PR",pinYin:"Puerto Rico",isHot:false},
    {nameCn:"巴勒斯坦",nameEn:"Palestine",codeId:"bf62a8678f7744998ddfe47806dbdb60",nationalCode:"PLST",pinYin:"Palestine",isHot:false},
    {nameCn:"波兰",nameEn:"Poland",codeId:"c4a500737d624ce3bc25cad38de0113e",nationalCode:"PL",pinYin:"Poland",isHot:false},
    {nameCn:"巴基斯坦",nameEn:"Pakistan",codeId:"e29b1be7fa1440f88cdbedc01610fa63",nationalCode:"PK",pinYin:"Pakistan",isHot:false},
    {nameCn:"菲律宾",nameEn:"Philippines",codeId:"7201a313a6ee4ca5a2d718ff666f10ed",nationalCode:"PH",pinYin:"Philippines",isHot:false},
    {nameCn:"巴布亚新几内亚",nameEn:"Papua New Guinea",codeId:"949cef64a9604a238a2fa4bc29237191",nationalCode:"PG",pinYin:"Papua New Guinea",isHot:false},
    {nameCn:"大溪地",nameEn:"Tahiti",codeId:"504007d775eb4de18383e60e8b98cbb0",nationalCode:"PFF",pinYin:"Tahiti",isHot:false},
    {nameCn:"法属波利尼西亚",nameEn:"French Polynesia",codeId:"eb8e2783f12943c1ba4e0a8b32dcfd3e",nationalCode:"PF",pinYin:"French Polynesia",isHot:false},
    {nameCn:"珀斯港",nameEn:"PERTH",codeId:"7b0b34809d3e4dd0b787d55de3850aa4",nationalCode:"PER",pinYin:"PERTH",isHot:false},
    {nameCn:"秘鲁",nameEn:"Peru",codeId:"00526dc7fbd248c7a884c1f80cdfeca1",nationalCode:"PE",pinYin:"Peru",isHot:false},
    {nameCn:"巴拿马",nameEn:"Panama",codeId:"eaecf8e7e0224dfcb5baf90983456eb6",nationalCode:"PA",pinYin:"Panama",isHot:false},
    {nameCn:"黄金海岸",nameEn:"GOLD COST",codeId:"b200233e97b94b48b274b45a302130bf",nationalCode:"OOL",pinYin:"GOLD COST",isHot:false},
    {nameCn:"博内尔",nameEn:"BONAIRE",codeId:"a632b0b8836543859a98e627b27cb15d",nationalCode:"ON",pinYin:"BONAIRE",isHot:false},
    {nameCn:"阿曼",nameEn:"Oman",codeId:"87934fda8c26405891a804b403f9885d",nationalCode:"OM",pinYin:"Oman",isHot:false},
    {nameCn:"新西兰",nameEn:"New Zealand",codeId:"8092944c999c4561aa52972e40282f66",nationalCode:"NZ",pinYin:"New Zealand",isHot:false},
    {nameCn:"圣基茨和尼维斯",nameEn:"Saint Kitts and Nevis",codeId:"19cf6537238546c0bbb2d15f51f02d73",nationalCode:"NV",pinYin:"Saint Kitts and Nevis",isHot:false},
    {nameCn:"纽埃岛",nameEn:"Niue",codeId:"93e16f5789ec4d599c47ada19b765706",nationalCode:"NU",pinYin:"Niue",isHot:false},
    {nameCn:"瑙鲁",nameEn:"Nauru",codeId:"fa727f61ea1544d0aeed3777cefb383a",nationalCode:"NR",pinYin:"Nauru",isHot:false},
    {nameCn:"尼泊尔",nameEn:"Nepal",codeId:"ded568716bad40418712869f39277005",nationalCode:"NP",pinYin:"Nepal",isHot:false},
    {nameCn:"挪威",nameEn:"Norway",codeId:"e4cb8b55ec9744a3affb031ce325d877",nationalCode:"NO",pinYin:"Norway",isHot:true},
    {nameCn:"北马里亚纳群岛",nameEn:"Northern Mariana Islands",codeId:"e3f14cf742b44266bde34024a0896a75",nationalCode:"NM",pinYin:"Northern Mariana Islands",isHot:false},
    {nameCn:"尼加拉瓜",nameEn:"Nicaragua",codeId:"6a83ecd39bdd4e0d9b007f3e7bddd412",nationalCode:"NI",pinYin:"Nicaragua",isHot:false},
    {nameCn:"名古屋",nameEn:"Nagoya",codeId:"eeae3ee7ba03429fad89f56eac1d9b78",nationalCode:"NGY",pinYin:"Nagoya",isHot:false},
    {nameCn:"尼日利亚",nameEn:"Nigeria",codeId:"21422f146ae44736bf629c6e925fed70",nationalCode:"NG",pinYin:"Nigeria",isHot:false},
    {nameCn:"尼日尔",nameEn:"Niger",codeId:"093a02aceae94e6aa7258f46c68fa497",nationalCode:"NE",pinYin:"Niger",isHot:false},
    {nameCn:"新喀里多尼亚",nameEn:"New Caledonia",codeId:"673b7ad0265a45529342d9dc1383278e",nationalCode:"NC",pinYin:"New Caledonia",isHot:false},
    {nameCn:"北爱尔兰",nameEn:"Northern Ireland",codeId:"235c689ed4af4921909fb41ea40dec6e",nationalCode:"NB",pinYin:"Northern Ireland",isHot:false},
    {nameCn:"纳米比亚",nameEn:"Namibia",codeId:"21e62eeb95344123a7cdc1dbbcd05c32",nationalCode:"NA",pinYin:"Namibia",isHot:false},
    {nameCn:"莫桑比克",nameEn:"Mozambique",codeId:"78921e0b0b40420fa5aa1d1bd7edda6c",nationalCode:"MZ",pinYin:"Mozambique",isHot:false},
    {nameCn:"马来西亚西马",nameEn:"my2",codeId:"d6a1d0ffd99544dba71316f7b6c5a6a1",nationalCode:"MY2",pinYin:"My2",isHot:false},
    {nameCn:"马来西亚东马",nameEn:"my1",codeId:"53de61e96205416bb942afb08492f134",nationalCode:"MY1",pinYin:"My1",isHot:false},
    {nameCn:"墨西哥",nameEn:"Mexico",codeId:"6a7f87eb0a694200a4ab0778872528df",nationalCode:"MX",pinYin:"Mexico",isHot:false},
    {nameCn:"马拉维",nameEn:"Malawi",codeId:"a0b8098e739149fca6304642ca83aa50",nationalCode:"MW",pinYin:"Malawi",isHot:false},
    {nameCn:"马尔代夫",nameEn:"Maldives",codeId:"9491c2cfdb5c4d48b2a1fd87d24d628c",nationalCode:"MV",pinYin:"Maldives",isHot:false},
    {nameCn:"毛里求斯",nameEn:"Mauritius",codeId:"d4b8e1d113b24692a7d3a1a0764e3714",nationalCode:"MU",pinYin:"Mauritius",isHot:false},
    {nameCn:"马耳他",nameEn:"Malta",codeId:"c30767face4e4d4a9bbeef0e93924543",nationalCode:"MT",pinYin:"Malta",isHot:false},
    {nameCn:"蒙特塞拉特岛",nameEn:"Montserrat",codeId:"e2af412e6c154e6eac2a85fe2fb1f7ea",nationalCode:"MS",pinYin:"Montserrat",isHot:false},
    {nameCn:"毛里塔尼亚",nameEn:"Mauritania",codeId:"07e7263198b74bd28665a8a72e3d23a7",nationalCode:"MR",pinYin:"Mauritania",isHot:false},
    {nameCn:"马提尼克",nameEn:"Martinique",codeId:"55dd3fd9097d43c8a1cb0924a04c6505",nationalCode:"MQ",pinYin:"Martinique",isHot:false},
    {nameCn:"蒙古",nameEn:"Mongolia",codeId:"2ff69dcbaeff42808b7afcd7a9c51ae0",nationalCode:"MN",pinYin:"Mongolia",isHot:false},
    {nameCn:"缅甸",nameEn:"Myanmar",codeId:"ead900a98c8c43bba45a7efb37d95cd5",nationalCode:"MM",pinYin:"Myanmar",isHot:false},
    {nameCn:"西属梅利利亚",nameEn:"Melilla",codeId:"da771319c5a24aabae99372689ad271a",nationalCode:"MLL",pinYin:"Melilla",isHot:false},
    {nameCn:"马里",nameEn:"Mali",codeId:"d3bbd30455094f26b0d152f1a3c9ccfc",nationalCode:"ML",pinYin:"Mali",isHot:false},
    {nameCn:"马其顿",nameEn:"Macedonia",codeId:"d5d9f90e6908481292d7cbe231057dbf",nationalCode:"MK",pinYin:"Macedonia",isHot:false},
    {nameCn:"马绍尔群岛",nameEn:"Marshall Islands",codeId:"04262ce81a9c4cd2837031466b95c4e2",nationalCode:"MH",pinYin:"Marshall Islands",isHot:false},
    {nameCn:"马达加斯加",nameEn:"Madagascar",codeId:"c82ecb833e81496c9ab8335fc4020aad",nationalCode:"MG",pinYin:"Madagascar",isHot:false},
    {nameCn:"墨尔本港",nameEn:"MELBOURNE",codeId:"1a859d282af248fba8bb3b7cb4c96312",nationalCode:"MEL",pinYin:"MELBOURNE",isHot:false},
    {nameCn:"黑山共和国",nameEn:"Montenegro",codeId:"68f179dd78644bd7b3948c7ab25dc6c9",nationalCode:"ME",pinYin:"Montenegro",isHot:false},
    {nameCn:"摩尔多瓦",nameEn:"Moldova, Republic of",codeId:"fe909ff318884375a35b69e85558b4a4",nationalCode:"MD",pinYin:"Moldova, Republic of",isHot:false},
    {nameCn:"摩纳哥",nameEn:"Monaco",codeId:"51946c7eccbf42f5adcd0039454f13d9",nationalCode:"MC",pinYin:"Monaco",isHot:false},
    {nameCn:"马德拉群岛",nameEn:"Madeira",codeId:"1f452e1e81a04a608c99f5ef154961c0",nationalCode:"MAD",pinYin:"Madeira",isHot:false},
    {nameCn:"摩洛哥",nameEn:"Morocco",codeId:"3c68e39bc3684174afa6ec948bc24d59",nationalCode:"MA",pinYin:"Morocco",isHot:false},
    {nameCn:"利比亚",nameEn:"Libya",codeId:"60e272d8adae4748be078a0bf0ecdf4e",nationalCode:"LY",pinYin:"Libya",isHot:false},
    {nameCn:"拉脱维亚",nameEn:"Latvia",codeId:"20f6d40ac1764f33b95835ce7dbfed22",nationalCode:"LV",pinYin:"Latvia",isHot:false},
    {nameCn:"卢森堡",nameEn:"Luxembourg",codeId:"9ef4065fdd764236a4ffd619517d46f6",nationalCode:"LU",pinYin:"Luxembourg",isHot:false},
    {nameCn:"立陶宛",nameEn:"Lithuania",codeId:"d8ca5b0feb1247baa07dbf6038958abf",nationalCode:"LT",pinYin:"Lithuania",isHot:false},
    {nameCn:"莱索托",nameEn:"Lesotho",codeId:"ae23c7da3a634f829d2ad3ac676a9650",nationalCode:"LS",pinYin:"Lesotho",isHot:false},
    {nameCn:"利比里亚",nameEn:"Liberia",codeId:"b4a161c0ee0d4ffbbafd31a3949fb342",nationalCode:"LR",pinYin:"Liberia",isHot:false},
    {nameCn:"美属处女群岛",nameEn:"Virgin Islands of th USA",codeId:"06bc54409bf6429f983e193e543b658e",nationalCode:"LL",pinYin:"Virgin Islands of th USA",isHot:false},
    {nameCn:"斯里兰卡",nameEn:"Sri Lanka",codeId:"645f0bb0260c4b6cbc32592df49ecf1f",nationalCode:"LK",pinYin:"Sri Lanka",isHot:false},
    {nameCn:"利维尼奥",nameEn:"Livigno",codeId:"5a7a59e5ecb446fe8d1e3ef8209471a6",nationalCode:"LIVIGNO",pinYin:"Livigno",isHot:false},
    {nameCn:"列支敦士登",nameEn:"Liechtenstein",codeId:"756875d24755406496a0526f18a60207",nationalCode:"LI",pinYin:"Liechtenstein",isHot:false},
    {nameCn:"圣露西亚",nameEn:"St. Lucia",codeId:"76dfd7c87c094279b4352b3008f3b31f",nationalCode:"LCC",pinYin:"St. Lucia",isHot:false},
    {nameCn:"圣卢西亚",nameEn:"Saint Lueia",codeId:"fbdea57795f644fd8c6d6106eb2f5fc1",nationalCode:"LC",pinYin:"Saint Lueia",isHot:false},
    {nameCn:"黎巴嫩",nameEn:"Lebanon",codeId:"4762dc9961c542bab5ded077c135dc67",nationalCode:"LB",pinYin:"Lebanon",isHot:false},
    {nameCn:"卢加诺湖",nameEn:"Lake lugano",codeId:"78d799dc050a41cc8a29b4ac96812f0f",nationalCode:"LAKE",pinYin:"Lake lugano",isHot:false},
    {nameCn:"老挝",nameEn:"Laos",codeId:"8c917b84d7ce4006a943979e16943a19",nationalCode:"LA",pinYin:"Laos",isHot:false},
    {nameCn:"哈萨克斯坦",nameEn:"Kazakstan",codeId:"f00cc9254bf5488ca177ac7a6dbefab4",nationalCode:"KZ",pinYin:"Kazakstan",isHot:false},
    {nameCn:"开曼群岛",nameEn:"Cayman Is.",codeId:"9eafe755184c4dcb83b704f6710aac8c",nationalCode:"KY",pinYin:"Cayman Is.",isHot:false},
    {nameCn:"科威特",nameEn:"Kuwait",codeId:"dc5a4c2f8eeb4268a2c258122fa053a1",nationalCode:"KW",pinYin:"Kuwait",isHot:false},
    {nameCn:"科索沃",nameEn:"Kosovo",codeId:"4beb555f9c894cbbb3aa8ee41d05aed4",nationalCode:"KV",pinYin:"Kosovo",isHot:false},
    {nameCn:"韩国",nameEn:"Korea",codeId:"31230158777a462595f984b23a210394",nationalCode:"KR",pinYin:"Korea",isHot:false},
    {nameCn:"朝鲜",nameEn:"North Korea",codeId:"783d7a6637e64c40b1aa83aff6b88ba2",nationalCode:"KP",pinYin:"North Korea",isHot:false},
    {nameCn:"圣基茨和尼维斯",nameEn:"Saint Kitts and Nevis",codeId:"da940e3a105a47dfac6489dff956766a",nationalCode:"KN",pinYin:"Saint Kitts and Nevis",isHot:false},
    {nameCn:"科摩罗",nameEn:"Comoros",codeId:"5499be6b51344f1d9b32e95ee92be9d0",nationalCode:"KM",pinYin:"Comoros",isHot:false},
    {nameCn:"基里巴斯",nameEn:"Kiribati",codeId:"324942f28cf04e34bf2d0e92f756ae2c",nationalCode:"KI",pinYin:"Kiribati",isHot:false},
    {nameCn:"柬埔寨",nameEn:"Cambodia (Kampuchea)",codeId:"af72249e1b394734b03b002525052cd1",nationalCode:"KH",pinYin:"Cambodia (Kampuchea)",isHot:false},
    {nameCn:"吉尔吉斯坦",nameEn:"Kyrgyzstan",codeId:"3f4322ed818b4d8d8b22c83a96b9d761",nationalCode:"KG",pinYin:"Kyrgyzstan",isHot:false},
    {nameCn:"肯尼亚",nameEn:"Kenya",codeId:"67f6b77056374f52a197df8b432d8e57",nationalCode:"KE",pinYin:"Kenya",isHot:false},
    {nameCn:"约旦",nameEn:"Jordan",codeId:"cd0ead59c21f48638fb88926827c027a",nationalCode:"JO",pinYin:"Jordan",isHot:false},
    {nameCn:"牙买加",nameEn:"Jamaica",codeId:"68faf78d1a394ca2a59da5b32f53b86b",nationalCode:"JM",pinYin:"Jamaica",isHot:false},
    {nameCn:"泽西岛",nameEn:"Jersey",codeId:"9caeff202ab24bffb843cc9313f14829",nationalCode:"JE",pinYin:"Jersey",isHot:false},
    {nameCn:"科特迪瓦",nameEn:"Ivory Coast",codeId:"03e3c4c874a44c94b3aa2ed5c047bba4",nationalCode:"IV",pinYin:"Ivory Coast",isHot:false},
    {nameCn:"意大利",nameEn:"Italy",codeId:"07c824378c0d453a91702a900c0b0493",nationalCode:"IT",pinYin:"Italy",isHot:true},
    {nameCn:"冰岛",nameEn:"Iceland",codeId:"5b343c8d9fd341ad9989b58119ea6b19",nationalCode:"IS",pinYin:"Iceland",isHot:false},
    {nameCn:"伊朗",nameEn:"Iran",codeId:"ea819d18a2424ef49dd0eb6deb344521",nationalCode:"IR",pinYin:"Iran",isHot:false},
    {nameCn:"伊拉克",nameEn:"Iraq",codeId:"6dd074f2565746789664726538ddc813",nationalCode:"IQ",pinYin:"Iraq",isHot:false},
    {nameCn:"印度",nameEn:"India",codeId:"39d117777d7042e5bf28022deaf6fa2f",nationalCode:"IN",pinYin:"India",isHot:false},
    {nameCn:"以色列",nameEn:"Israel",codeId:"033aa6924e5a4f8f834c011283df0744",nationalCode:"IL",pinYin:"Israel",isHot:true},
    {nameCn:"爱尔兰",nameEn:"Ireland",codeId:"297a3d2efc4b4b41ad6730259d62105e",nationalCode:"IE",pinYin:"Ireland",isHot:false},
    {nameCn:"印度尼西亚",nameEn:"Indonesia",codeId:"cfab8ad0906b4dffbf1e056dbaa7e715",nationalCode:"ID",pinYin:"Indonesia",isHot:false},
    {nameCn:"加那利群岛",nameEn:"Canary Islands",codeId:"52824003bbf14cefaf3a6cad6293b905",nationalCode:"IC",pinYin:"Canary Islands",isHot:false},
    {nameCn:"匈牙利",nameEn:"Hungary",codeId:"709db3065208490098fb1f18cb07ce69",nationalCode:"HU",pinYin:"Hungary",isHot:false},
    {nameCn:"海地",nameEn:"Haiti",codeId:"f0b5b2c35a06465eaa7c4b478b75afd5",nationalCode:"HT",pinYin:"Haiti",isHot:false},
    {nameCn:"克罗地亚",nameEn:"Croatia (local name: Hrvatska)(HR)",codeId:"4de7a9be7cac4fb6ba6efbcc9e6a74ad",nationalCode:"HR",pinYin:"Croatia (local name: Hrvatska)(HR)",isHot:false},
    {nameCn:"洪都拉斯",nameEn:"Honduras",codeId:"274bddd1c49d445080b8db9c2fdacad2",nationalCode:"HN",pinYin:"Honduras",isHot:false},
    {nameCn:"黑尔格兰（德国）",nameEn:"Heligoland(Germany)",codeId:"ebc74b0f8cc54488820777215d33072f",nationalCode:"HG",pinYin:"Heligoland(Germany)",isHot:false},
    {nameCn:"圭亚那",nameEn:"Guyana",codeId:"78ab368906f04cdeae4b5b5979dd3e73",nationalCode:"GY",pinYin:"Guyana",isHot:false},
    {nameCn:"几内亚比绍",nameEn:"Guinea-Bissau",codeId:"be1869a5f3bb4bb6b080dfc6ba5f0a19",nationalCode:"GW",pinYin:"Guinea-Bissau",isHot:false},
    {nameCn:"关岛",nameEn:"Guam",codeId:"65ba528340dd47ae87c61e29c3fe1082",nationalCode:"GU",pinYin:"Guam",isHot:false},
    {nameCn:"危地马拉",nameEn:"Guatemala",codeId:"94bf534687a342b6abe73412ece1e052",nationalCode:"GT",pinYin:"Guatemala",isHot:false},
    {nameCn:"希腊",nameEn:"Greece",codeId:"3d44405f45a94a47ae0ddfdbfa3b29de",nationalCode:"GR",pinYin:"Greece",isHot:false},
    {nameCn:"赤道几内亚",nameEn:"Equatorial Guinea",codeId:"51d3790f3b4a4726bffdf06435b80c8c",nationalCode:"GQ",pinYin:"Equatorial Guinea",isHot:false},
    {nameCn:"瓜德罗普岛",nameEn:"Guadeloupe",codeId:"cc99ea6ec1e342e489fbd37bd13d9119",nationalCode:"GP",pinYin:"Guadeloupe",isHot:false},
    {nameCn:"几内亚",nameEn:"Guinea",codeId:"15bd0b8a6c27492d9a47eecf757c847c",nationalCode:"GN",pinYin:"Guinea",isHot:false},
    {nameCn:"冈比亚",nameEn:"Gambia",codeId:"83cd014737994181a2486503e05c5f58",nationalCode:"GM",pinYin:"Gambia",isHot:false},
    {nameCn:"格陵兰",nameEn:"Greenland",codeId:"6d70c78a7f344adcb1fb5a85fd1de1f5",nationalCode:"GL",pinYin:"Greenland",isHot:false},
    {nameCn:"直布罗陀",nameEn:"Gibraltar",codeId:"1720efcf8a864120960f38b4c889afc2",nationalCode:"GI",pinYin:"Gibraltar",isHot:false},
    {nameCn:"加纳",nameEn:"Ghana",codeId:"c798087bcd294ccfbaae6d79593f3028",nationalCode:"GH",pinYin:"Ghana",isHot:false},
    {nameCn:"根西岛",nameEn:"Guernsey",codeId:"28bab18164d346ec9994b3a74cf74ecc",nationalCode:"GG",pinYin:"Guernsey",isHot:false},
    {nameCn:"法属圭亚那",nameEn:"French Guiana",codeId:"eb47905a52b347eaa18524438ab091e2",nationalCode:"GF",pinYin:"French Guiana",isHot:false},
    {nameCn:"格鲁吉亚",nameEn:"Georgia",codeId:"199d3a6bdc5342f097ec56078180b025",nationalCode:"GE",pinYin:"Georgia",isHot:false},
    {nameCn:"格林纳达",nameEn:"Grenada",codeId:"be6a2514c21e48b7ae89b4ff108b8d18",nationalCode:"GD",pinYin:"Grenada",isHot:false},
    {nameCn:"英属维尔京斯岛",nameEn:"Virgin Islands (British)",codeId:"7e3c33a6184e4ae798138728cce4366d",nationalCode:"GBVG",pinYin:"Virgin Islands (British)",isHot:false},
    {nameCn:"马恩岛",nameEn:"Isle of Man",codeId:"df98ad5795bd4f7e95eca47e53c06d5c",nationalCode:"GBB",pinYin:"Isle of Man",isHot:false},
    {nameCn:"加蓬",nameEn:"Gabon",codeId:"8d955a5f724a463c853155ee7120ff75",nationalCode:"GA",pinYin:"Gabon",isHot:false},
    {nameCn:"塔希堤",nameEn:"Tahiti",codeId:"37ecb758fbf2418694446e75182ee6dd",nationalCode:"FP",pinYin:"Tahiti",isHot:false},
    {nameCn:"法罗群岛",nameEn:"Faroe Islands",codeId:"136e9aa0e8294eebabd7a425212b4bd9",nationalCode:"FO",pinYin:"Faroe Islands",isHot:false},
    {nameCn:"密克罗尼西亚",nameEn:"Micronesia",codeId:"be2ced0130e74221b2560a5e8f48ff51",nationalCode:"FM",pinYin:"Micronesia",isHot:false},
    {nameCn:"福克兰群岛",nameEn:"Falkland Islands",codeId:"6d0b4b2e562644a08ed2ce220705179f",nationalCode:"FK",pinYin:"Falkland Islands",isHot:false},
    {nameCn:"斐济",nameEn:"Fiji",codeId:"122a739d60e74348af951edef6ccf8fe",nationalCode:"FJ",pinYin:"Fiji",isHot:false},
    {nameCn:"芬兰",nameEn:"Finland",codeId:"05404c8f875d46d39fe88752c1200690",nationalCode:"FI",pinYin:"Finland",isHot:false},
    {nameCn:"埃塞俄比亚",nameEn:"Ethiopia",codeId:"8bd4e2fe3c7a4f48ba547dee21188275",nationalCode:"ET",pinYin:"Ethiopia",isHot:false},
    {nameCn:"厄立特里亚",nameEn:"Eritrea",codeId:"df8ef4f4669040188de486aa21b7b1d2",nationalCode:"ER",pinYin:"Eritrea",isHot:false},
    {nameCn:"埃及",nameEn:"Egypt",codeId:"d0d26b7ab08d473b86a715be6c61bffb",nationalCode:"EG",pinYin:"Egypt",isHot:false},
    {nameCn:"爱沙尼亚",nameEn:"Estonia",codeId:"9958868e9bfd47d1a6c4541a6c00a77b",nationalCode:"EE",pinYin:"Estonia",isHot:false},
    {nameCn:"厄瓜多尔",nameEn:"Ecuador",codeId:"a12fa084949b4b8180ce9a35c72b1a52",nationalCode:"EC",pinYin:"Ecuador",isHot:false},
    {nameCn:"阿尔及利亚",nameEn:"Algeria",codeId:"8cf4a102ac134d00bfa448c262182a22",nationalCode:"DZ",pinYin:"Algeria",isHot:false},
    {nameCn:"多米尼加共和国",nameEn:"Dominica Rep.",codeId:"f31ef7c62e5b4533b75bd0a1faaee5fe",nationalCode:"DO",pinYin:"Dominica Rep.",isHot:false},
    {nameCn:"多米尼加",nameEn:"Dominica",codeId:"2e3a0dd8223845b59687943ba9373105",nationalCode:"DM",pinYin:"Dominica",isHot:false},
    {nameCn:"丹麦",nameEn:"Denmark",codeId:"b43e2996d01948c6b60b00ef38d7253e",nationalCode:"DK",pinYin:"Denmark",isHot:false},
    {nameCn:"吉布提",nameEn:"Djibouti",codeId:"24b19faa17a74ccd8d0ab3b4333fc8a1",nationalCode:"DJ",pinYin:"Djibouti",isHot:false},
    {nameCn:"捷克",nameEn:"Czech Republic",codeId:"20191fab40f043a589017c1ed59081f6",nationalCode:"CZ",pinYin:"Czech Republic",isHot:false},
    {nameCn:"塞浦路斯",nameEn:"Cyprus",codeId:"b701c3d17515450bb9948443d22c4988",nationalCode:"CY",pinYin:"Cyprus",isHot:false},
    {nameCn:"佛得角",nameEn:"Cape Verde",codeId:"8fc4d8630fab4242b52ef9979a8b8414",nationalCode:"CV",pinYin:"Cape Verde",isHot:false},
    {nameCn:"古巴",nameEn:"Cuba",codeId:"f3c169b0144446929650d889385101ed",nationalCode:"CU",pinYin:"Cuba",isHot:false},
    {nameCn:"休达",nameEn:"Ceuta",codeId:"4bf79f4639a64c6fb2f09f8b77fcb44d",nationalCode:"CT",pinYin:"Ceuta",isHot:false},
    {nameCn:"哥斯达黎加",nameEn:"Costa Rica",codeId:"7c5ab52bfe784effbfb7f7cbd68da36a",nationalCode:"CR",pinYin:"Costa Rica",isHot:false},
    {nameCn:"哥伦比亚",nameEn:"Colombia",codeId:"3f784658686844d6ab56bdcaed919ece",nationalCode:"CO",pinYin:"Colombia",isHot:false},
    {nameCn:"喀麦隆",nameEn:"Cameroon",codeId:"0f738b6f321e4353bbf09101e258cede",nationalCode:"CM",pinYin:"Cameroon",isHot:false},
    {nameCn:"智利",nameEn:"Chile",codeId:"1571a21673de434da0075102363bd4dd",nationalCode:"CL",pinYin:"Chile",isHot:false},
    {nameCn:"库克群岛",nameEn:"Cook Is.",codeId:"76f060e474dc4d3bb7a479e1c6c7d194",nationalCode:"CK",pinYin:"Cook Is.",isHot:false},
    {nameCn:"科特迪瓦",nameEn:"Ivory Coast",codeId:"24962761b6fe47eaabe3607b82ae8cf0",nationalCode:"CI",pinYin:"Ivory Coast",isHot:false},
    {nameCn:"刚果民主共和国",nameEn:"The Democratic Republic of Congo",codeId:"8dcd32e0f3a343709197288b55d26dcf",nationalCode:"CGO",pinYin:"The Democratic Republic of Congo",isHot:false},
    {nameCn:"刚果",nameEn:"Congo",codeId:"30066384892a4cbfac4b002d3e57cbe2",nationalCode:"CG",pinYin:"Congo",isHot:false},
    {nameCn:"中非共和国",nameEn:"Central African Republic",codeId:"b589b19ac9c842d5b7360db305732e2b",nationalCode:"CF",pinYin:"Central African Republic",isHot:false},
    {nameCn:"刚果人民共和国",nameEn:"The Republic of Congo",codeId:"3a3580153b794d0db2ee5b7c872b3dd6",nationalCode:"CD",pinYin:"The Republic of Congo",isHot:false},
    {nameCn:"坎皮奥内",nameEn:"Campione",codeId:"22c8da3dbfd7484797b49ea2865f7c62",nationalCode:"CAMPION",pinYin:"Campione",isHot:false},
    {nameCn:"伯利兹",nameEn:"Belize",codeId:"b0990fd9fd6549898a300746811b9f43",nationalCode:"BZ",pinYin:"Belize",isHot:false},
    {nameCn:"白俄罗斯",nameEn:"Belarus",codeId:"f3b0af80a11244f496863ae59a789eb5",nationalCode:"BY",pinYin:"Belarus",isHot:false},
    {nameCn:"博茨瓦纳",nameEn:"Botswana",codeId:"d076d17f3a84447aa2ccb6da16041d38",nationalCode:"BW",pinYin:"Botswana",isHot:false},
    {nameCn:"布辛根(德国）",nameEn:"Büsingen",codeId:"e8f5efb51f28483fb492c82f39c83fe8",nationalCode:"BUS",pinYin:"Büsingen",isHot:false},
    {nameCn:"不丹",nameEn:"Bhutan",codeId:"13dd833e8e5442eca86d832ce3a02c9a",nationalCode:"BT",pinYin:"Bhutan",isHot:false},
    {nameCn:"波斯尼亚和黑塞哥维那",nameEn:"Bosnia and Herzegovina",codeId:"0e7d4395c35448e79ca9d0d940241670",nationalCode:"BSH",pinYin:"Bosnia and Herzegovina",isHot:false},
    {nameCn:"巴哈马",nameEn:"Bahamas",codeId:"01f784d5540a4983a450c4c5cf99e90a",nationalCode:"BS",pinYin:"Bahamas",isHot:false},
    {nameCn:"巴西",nameEn:"Brazil",codeId:"ba370c9fc1c0450e944586592b109b7f",nationalCode:"BR",pinYin:"Brazil",isHot:true},
    {nameCn:"玻利维亚",nameEn:"Bolivia",codeId:"5b8f6e61dede4478a80f7e175820725b",nationalCode:"BO",pinYin:"Bolivia",isHot:false},
    {nameCn:"文莱",nameEn:"Brunei",codeId:"8820b95e61e140618193dbb8947b3cc5",nationalCode:"BN",pinYin:"Brunei",isHot:false},
    {nameCn:"百慕大群岛",nameEn:"Bermuda Is.",codeId:"fcc6dad6309e40a0874cfc5d7bf69635",nationalCode:"BM",pinYin:"Bermuda Is.",isHot:false},
    {nameCn:"贝宁",nameEn:"Benin",codeId:"9cf810049ddb473c943b75f8f9dcacaa",nationalCode:"BJ",pinYin:"Benin",isHot:false},
    {nameCn:"布隆迪",nameEn:"Burundi",codeId:"2635f57e70694eb2b0434395b1b35f03",nationalCode:"BI",pinYin:"Burundi",isHot:false},
    {nameCn:"巴林",nameEn:"Bahrain",codeId:"e505e59904a6471ab9e94cdcef0df0bb",nationalCode:"BH",pinYin:"Bahrain",isHot:false},
    {nameCn:"保加利亚",nameEn:"Bulgaria",codeId:"174cc60c53604b138119d6249e85f107",nationalCode:"BG",pinYin:"Bulgaria",isHot:false},
    {nameCn:"布基纳法索",nameEn:"Burkina-faso",codeId:"f402b52a18da488b9f3bfeaa1756af85",nationalCode:"BF",pinYin:"Burkina-faso",isHot:false},
    {nameCn:"比利时",nameEn:"Belgium",codeId:"4ca59ff07e8f47e48f42bcdf2a7fc5cc",nationalCode:"BE",pinYin:"Belgium",isHot:true},
    {nameCn:"孟加拉国",nameEn:"Bangladesh",codeId:"e67767ddb6b7498b8f8b9a66c2d6596d",nationalCode:"BD",pinYin:"Bangladesh",isHot:false},
    {nameCn:"巴巴多斯",nameEn:"Barbados",codeId:"9c0d3db1aaac49d9b22faeaeae4192d9",nationalCode:"BB",pinYin:"Barbados",isHot:false},
    {nameCn:"澳洲一区",nameEn:"Australia1",codeId:"bc668041b5d84fed92d8a4677b8df6e5",nationalCode:"AZYQ",pinYin:"Australia1",isHot:false},
    {nameCn:"澳洲二区",nameEn:"Australia2",codeId:"da86e54af78e4c59a861064bbfa436d1",nationalCode:"AZEQ",pinYin:"Australia2",isHot:false},
    {nameCn:"阿塞拜疆",nameEn:"Azerbaijan",codeId:"787de26f414343a585578315ea5a2978",nationalCode:"AZ",pinYin:"Azerbaijan",isHot:false},
    {nameCn:"阿鲁巴岛",nameEn:"Aruba",codeId:"cc600588564a40e980773fc3a35ca412",nationalCode:"AW",pinYin:"Aruba",isHot:false},
    {nameCn:"悉尼二区",nameEn:"SYDNEY",codeId:"90ed1d48899445e49a8eea218a8568da",nationalCode:"AU2",pinYin:"SYDNEY",isHot:false},
    {nameCn:"奥地利",nameEn:"Austria",codeId:"24beb6da262e477abe40b0b9ca75dbb1",nationalCode:"AT",pinYin:"Austria",isHot:false},
    {nameCn:"东萨摩亚(美)",nameEn:"Samoa Eastern",codeId:"9bab8ae5d24149f3b7dfecf72ea8e597",nationalCode:"AS",pinYin:"Samoa Eastern",isHot:false},
    {nameCn:"阿根廷",nameEn:"Argentina",codeId:"b9494c3002e9407a8c09ef91ac659175",nationalCode:"AR",pinYin:"Argentina",isHot:false},
    {nameCn:"安哥拉",nameEn:"Angola",codeId:"22edbf8283134d29b749e10bda4a0d11",nationalCode:"AO",pinYin:"Angola",isHot:false},
    {nameCn:"亚美尼亚",nameEn:"Armenia",codeId:"8d68818cead64613a5e4dad4726dafaa",nationalCode:"AM",pinYin:"Armenia",isHot:false},
    {nameCn:"阿尔巴尼亚",nameEn:"Albania",codeId:"220ac18237ca484bb4a33b028fb65981",nationalCode:"AL",pinYin:"Albania",isHot:false},
    {nameCn:"奥兰群岛",nameEn:"Aland Island",codeId:"62679567596942f5acbfa3a5cff095d0",nationalCode:"AID",pinYin:"Aland Island",isHot:false},
    {nameCn:"安圭拉岛",nameEn:"Anguilla",codeId:"d6c37fdb25a443a28d1b07e5d8176bbe",nationalCode:"AI",pinYin:"Anguilla",isHot:false},
    {nameCn:"安提瓜和巴布达",nameEn:"Antigua and Barbuda",codeId:"a781aa07659147008e9eaecadc78dbd4",nationalCode:"AG",pinYin:"Antigua and Barbuda",isHot:false},
    {nameCn:"阿富汗",nameEn:"Afghanistan",codeId:"691e472d5c4b408d99c7711d5bc1a220",nationalCode:"AF",pinYin:"Afghanistan",isHot:false},
    {nameCn:"阿拉伯联合酋长国",nameEn:"United Arab Emirates",codeId:"2ac25ad0868a450a9c1d933bea7f9543",nationalCode:"AE",pinYin:"United Arab Emirates",isHot:false},
    {nameCn:"安道尔共和国",nameEn:"Andorra",codeId:"4ddf22abc74d4af5a421a47c01154fc6",nationalCode:"AD",pinYin:"Andorra",isHot:false},
    {nameCn:"图瓦卢",nameEn:"Tuvalu",codeId:"d34fd18daf5b486e98c1e4e85ca017b1",nationalCode:"TV",pinYin:"Tuvalu",isHot:false},
    {nameCn:"台湾省",nameEn:"Taiwan",codeId:"b8367250d0a6421482736e2413284ea1",nationalCode:"TW",pinYin:"Taiwan",isHot:false},
    {nameCn:"坦桑尼亚",nameEn:"Tanzania",codeId:"905ecd9a4e294a11b99d175fdba923b7",nationalCode:"TZ",pinYin:"Tanzania",isHot:false},
    {nameCn:"乌克兰",nameEn:"Ukraine",codeId:"ab01f3ce849c4b24b912ada3b598ecfd",nationalCode:"UA",pinYin:"Ukraine",isHot:true},
    {nameCn:"乌干达",nameEn:"Uganda",codeId:"139ff295ae594d90bea0be80f261e970",nationalCode:"UG",pinYin:"Uganda",isHot:false},
    {nameCn:"威尔士(英国)",nameEn:"Wales",codeId:"5ccd8bf1c55f44a48ce40364d4007e72",nationalCode:"UKL",pinYin:"Wales",isHot:false},
    {nameCn:"库拉索",nameEn:"Curacao",codeId:"3467f8fcef68495492fe4ccd445c4812",nationalCode:"UR",pinYin:"Curacao",isHot:false},
    {nameCn:"美国",nameEn:"United States",codeId:"528f22d36e3e43d38c74a5bee56c4aea",nationalCode:"US",pinYin:"United States",isHot:true},
    {nameCn:"乌拉圭",nameEn:"Uruguay",codeId:"eb361611b769480396e40519b73b1250",nationalCode:"UY",pinYin:"Uruguay",isHot:false},
    {nameCn:"乌兹别克斯坦",nameEn:"Uzbekistan",codeId:"0d58fd9acf0c4be79fc1f4cf1051ec25",nationalCode:"UZ",pinYin:"Uzbekistan",isHot:false},
    {nameCn:"圣文森特岛",nameEn:"St Vincent",codeId:"0d6db1d398134250b011b3e18dcfe786",nationalCode:"VC",pinYin:"St Vincent",isHot:false},
    {nameCn:"委内瑞拉",nameEn:"Venezuela",codeId:"d8084360b7ff48fc8ba63c0d8842d4ff",nationalCode:"VE",pinYin:"Venezuela",isHot:false},
    {nameCn:"美属维尔京斯岛",nameEn:"Virgin Islands (U.S.)",codeId:"f3650a2324c84ef1a1c7e8de4fedbcde",nationalCode:"VI",pinYin:"Virgin Islands (U.S.)",isHot:false},
    {nameCn:"越南",nameEn:"Vietnam",codeId:"bb1456ef8ef24503b1aea52bb6eec950",nationalCode:"VN",pinYin:"Vietnam",isHot:false},
    {nameCn:"梵蒂冈",nameEn:"Vaticanae",codeId:"c093b1a98ad44b6bb13079458da0915e",nationalCode:"VT",pinYin:"Vaticanae",isHot:false},
    {nameCn:"罗马教区(梵蒂冈)",nameEn:"Vaticanae",codeId:"00dde052b7ae45d1beeb186f6f2bb667",nationalCode:"VTT",pinYin:"Vaticanae",isHot:false},
    {nameCn:"瓦努阿图",nameEn:"Vanuatu",codeId:"be7241693ce24856b8ae60f9c996793c",nationalCode:"VU",pinYin:"Vanuatu",isHot:false},
    {nameCn:"瓦利斯群岛和富图纳群岛",nameEn:"Wallis & Futuna",codeId:"f942b876ea274fe9ba3c085bf5fe4142",nationalCode:"WA",pinYin:"Wallis & Futuna",isHot:false},
    {nameCn:"西萨摩亚",nameEn:"Samoa Western",codeId:"3ad8e3f5cd4f400899acf241b43ebe8a",nationalCode:"WS",pinYin:"Samoa Western",isHot:false},
    {nameCn:"伯奈尔",nameEn:"Bonaire",codeId:"710330c2d0f34d3caca45a562f768447",nationalCode:"XB",pinYin:"Bonaire",isHot:false},
    {nameCn:"库腊索岛",nameEn:"CURACAO",codeId:"7aa5e5ee324b444182310f20cb532f72",nationalCode:"XC",pinYin:"CURACAO",isHot:false},
    {nameCn:"圣尤斯达求斯",nameEn:"St Eustatius",codeId:"87499d68efb245e6aa613e099603cb58",nationalCode:"XE",pinYin:"St Eustatius",isHot:false},
    {nameCn:"圣圣尤斯特歇斯",nameEn:"St. Eustatius",codeId:"0a466f099da549d38b9bf89f769c66b3",nationalCode:"XEE",pinYin:"St. Eustatius",isHot:false},
    {nameCn:"圣马丁",nameEn:"St Maarten",codeId:"001a3af75f494c219722b9356f7616a3",nationalCode:"XM",pinYin:"St Maarten",isHot:false},
    {nameCn:"圣巴泰勒米",nameEn:"ST. BARTHELEMY",codeId:"d2a74a8f97cf4bacba746181167173ee",nationalCode:"XY",pinYin:"ST. BARTHELEMY",isHot:false},
    {nameCn:"圣巴托洛缪",nameEn:"St. Barthelemy",codeId:"c4eb86ea40aa402791fd1f651b26cf82",nationalCode:"XYY",pinYin:"St. Barthelemy",isHot:false},
    {nameCn:"也门",nameEn:"Yemen",codeId:"7a63e2d3dc3b4775b5eb5d621912a62d",nationalCode:"YE",pinYin:"Yemen",isHot:false},
    {nameCn:"南斯拉夫",nameEn:"Yugoslavia",codeId:"03cbd923aa974e419429fd4937189bed",nationalCode:"YUU",pinYin:"Yugoslavia",isHot:false},
    {nameCn:"南非",nameEn:"South Africa",codeId:"4c2ea9cb708b48d7b56f9760d5c2cae0",nationalCode:"ZA",pinYin:"South Africa",isHot:false},
    {nameCn:"赞比亚",nameEn:"Zambia",codeId:"4526f2b70fd04a278d9690c733625b06",nationalCode:"ZM",pinYin:"Zambia",isHot:false},
    {nameCn:"津巴布韦",nameEn:"Zimbabwe",codeId:"8abb1d1c7cc5478285075f2a38dbc152",nationalCode:"ZW",pinYin:"Zimbabwe",isHot:false},
    {nameCn:"香港",nameEn:"Hong Kong",codeId:"df5e91b9f98641a39961b6e8267f2c61",nationalCode:"HK",pinYin:"Hong Kong",isHot:false},
    {nameCn:"澳门",nameEn:"Macao",codeId:"c567fe0cc8684779999c6ef8bd982f6d",nationalCode:"MO",pinYin:"Macao",isHot:false},
    {nameCn:"中国",nameEn:"China",codeId:"4028818d5287dcc5015287fef7eb000c",nationalCode:"CHN",pinYin:"China",isHot:false},
];

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */
(function () {
    var citys = Country.allCity, match, letter,
        // regEx = Country.regEx,regEx1=/([\u4E00-\u9FA5\uf900-\ufa2d\(\)\（\）]+)\|([a-zA-Z0-9\(\)\,\.\-\:\&\ ]+)\|(\w+)\|([0-9a-zA-Z]+)$/i,
        //{A B} {C D} {E F G} {H I} {J} {K L} {M N O P} {Q R} {S} {T} {U V W} {X} {Y} {Z}
        reg2 = /^[a-bA-B]$/i,
        reg3 = /^[c-d]$/i,
        reg4 = /^[e-g]$/i,
        reg5 = /^[h-j]$/i,
        reg7 = /^[k-l]$/i,
        reg8 =  /^[m-o]$/i,
        reg9 =  /^[p-r]$/i,
        reg10 =  /^[s]$/i,
        reg11 =  /^[t]$/i,
        reg12 =  /^[u-w]$/i,
        reg15 =  /^[x-z]$/i;
    var hot=[ '美国', '俄罗斯', '法国', '瑞典', '加拿大', '英国', '德国', '西班牙', '以色列', '荷兰', '美国东部', '意大利', '比利时', '澳大利亚', '乌克兰', '瑞士', '美国西部', '巴西', '挪威'];
    if (!Country.oCity) {
        Country.oCity = {hot:{},AB:{},CD:{},EFG:{},HIJ:{},KL:{},MNO:{},PQR:{},S:{},T:{},UVW:{},XYZ:{}};
        for (var i = 0, n = citys.length; i < n; i++) {
            match = citys[i];
            if(!match || match===""){
                continue;
            }
            letter = match.pinYin[0];
            var yui=match;
            if (reg2.test(letter)) {
                if (!Country.oCity.AB[letter]) Country.oCity.AB[letter] = [];
                Country.oCity.AB[letter].push(yui);
            } else if (reg3.test(letter)) {
                if (!Country.oCity.CD[letter]) Country.oCity.CD[letter] = [];
                Country.oCity.CD[letter].push(yui);
            } else if (reg4.test(letter)) {
                if (!Country.oCity.EFG[letter]) Country.oCity.EFG[letter] = [];
                Country.oCity.EFG[letter].push(yui);
            }else if (reg5.test(letter)) {
                if (!Country.oCity.HIJ[letter]) Country.oCity.HIJ[letter] = [];
                Country.oCity.HIJ[letter].push(yui);
            }else if (reg7.test(letter)) {
                if (!Country.oCity.KL[letter]) Country.oCity.KL[letter] = [];
                Country.oCity.KL[letter].push(yui);
            }else if (reg8.test(letter)) {
                if (!Country.oCity.MNO[letter]) Country.oCity.MNO[letter] = [];
                Country.oCity.MNO[letter].push(yui);
            }else if (reg9.test(letter)) {
                if (!Country.oCity.PQR[letter]) Country.oCity.PQR[letter] = [];
                Country.oCity.PQR[letter].push(yui);
            }else if (reg10.test(letter)) {
                if (!Country.oCity.S[letter]) Country.oCity.S[letter] = [];
                Country.oCity.S[letter].push(yui);
            }else if (reg11.test(letter)) {
                if (!Country.oCity.T[letter]) Country.oCity.T[letter] = [];
                Country.oCity.T[letter].push(yui);
            }else if (reg12.test(letter)) {
                if (!Country.oCity.UVW[letter]) Country.oCity.UVW[letter] = [];
                Country.oCity.UVW[letter].push(yui);
            }else if (reg15.test(letter)) {
                if (!Country.oCity.XYZ[letter]) Country.oCity.XYZ[letter] = [];
                Country.oCity.XYZ[letter].push(yui);
            }
            for(var ki in hot){
                if(typeof  hot[ki] ==='string' &&  match.nameCn===hot[ki]){
                    hot[ki]=match
                }
            }
        }
        if(!Country.oCity.hot['hot']) Country.oCity.hot['hot'] = [];
        Country.oCity.hot['hot']=hot;
        // console.log(Country.oCity);
    }
})();


/* 城市HTML模板 */
Country._template = [
    '<p class="cityTip">直接输入可搜索国家(支持汉字/英文)</p>',
    '<ul>',
    '<li class="on">热门国家</li>',
    '<li>AB</li>',
    '<li>CD</li>',
    '<li>EFG</li>',
    '<li>HIJ</li>',
    '<li>KL</li>',
    '<li>MNO</li>',
    '<li>PQR</li>',
    '<li>S</li>',
    '<li>T</li>',
    '<li>UVW</li>',
    '<li>XYZ</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Country.CitySelector = function () {
    this.initialize.apply(this, arguments);
};
Country.CitySelector.prototype = {
    constructor:Country.CitySelector,
    initialize :function (options) {
        var input = options.input;
        this.input = Country._m.$('#'+ input);
        if( !this.input ){
            console.log('No find #'+ input);
            return false;
        }
        if(options.callback){
            this.callback=options.callback;
        }
        this.inputEvent();
    },

    /* *


     /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */
    createWarp:function(){
        // if(this.rootDiv){
        //     return false;
        // }
        var inputPos = Country._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;
        // 设置DIV阻止冒泡
        Country._m.on(this.rootDiv,'click',function(event){
            Country._m.stopPropagation(event);
        });
        // 设置点击文档隐藏弹出的城市选择框
        Country._m.on(document, 'click', function (event) {
            event = Country._m.getEvent(event);
            var target = Country._m.getTarget(event);
            if(target == that.input) return false;
            if (that.countryBox)Country._m.addClass('hide', that.countryBox);
            if (that.ul)Country._m.addClass('hide', that.ul);
            if(that.myIframe)Country._m.addClass('hide',that.myIframe);

            var lis = [];
            if(!!that.ul){
                lis = Country._m.$('li',that.ul);
                if(Country._m.hasClass('empty',lis[0])){
                    that.arrParm=null;
                    that.input.value="";
                    that.ul.innerHTML=""
                    that.callback(that.arrParm);
                    return false;
                }
            }
            if(lis.length==0){
                return false;
            }

            var t=lis[0];
            var code=t.getAttribute('data-countryid');
            for(var yui in Country.allCity){
                var cout=Country.allCity[yui];
                if(cout.codeId==code){
                    that.input.value=cout.nameCn;
                    that.arrParm=cout;
                    that.callback(cout);
                    break;
                }
            };
            that.ul.innerHTML="";
            that.callback(that.arrParm);

        });
        div.className = 'countrySelector' + ' country' +(Country._m.$('.countrySelector').length+1);
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom -1 + 'px';
        div.style.zIndex = 999999;
        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.countryBox = document.createElement('div');
        childdiv.className = 'countryBox'+ ' countryBox' +(Country._m.$('.countrySelector').length+1);
        // childdiv.id = 'countryBox';
        childdiv.innerHTML = Country._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCountry'+ ' hotCountry' +(Country._m.$('.countrySelector').length+1);
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Country.regEx,
            oCity = Country.oCity;

        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'countryTab'+ ' countryTab' +(Country._m.$('.countrySelector').length+1)+' hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    var sortContext=oCity[key][sortKey[j]][i];
                    str = '<a href="javascript:void(0);" data-countryId="'+ sortContext.codeId+'">' + sortContext.nameCn + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Country._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();
        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Country._m.$('li',this.countryBox);
        var divs = Country._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Country._m.removeClass('on',lis[j]);
                    Country._m.addClass('hide',divs[j]);
                }
                Country._m.addClass('on',this);
                Country._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */
    arrParm:null,
    linkEvent:function(){
        var links = Country._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                Country._m.addClass('hide',that.countryBox);
                var codeId=Country._m.trim(this.getAttribute('data-countryid'));
                for(var k in Country.allCity){
                    var ku= Country.allCity[k];
                    if(ku.codeId==codeId){
                        that.arrParm=ku;
                        that.input.value = that.arrParm.nameCn;
                        that.callback(that.arrParm);
                        break;
                    }
                };
                /* 点击城市名的时候隐藏myIframe */
                Country._m.addClass('hide',that.myIframe);
            }
        };
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Country._m.on(this.input,'click',function(event){
            event = event || window.event;
            // if(!that.countryBox){
            if(!that.countryBox){
                // console.log("进入建立");
                that.createWarp();
            }else if(!!that.countryBox && Country._m.hasClass('hide',that.countryBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                // console.log("显示1");
                if(!that.ul || (that.ul && Country._m.hasClass('hide',that.ul))){
                    var div=that.rootDiv;
                    var inputPos = Country._m.getPos(that.input);
                    Country._m.removeClass('hide',that.countryBox);
                    div.style.left = inputPos.left + 'px';
                    div.style.top = inputPos.bottom  - 1 + 'px';
                    div.style.zIndex = 999999;
                    var myIframe=that.myIframe;
                    // console.log( that.arrParm)
                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Country._m.removeClass('hide',myIframe);
                    that.changeIframe();
                }
            }
        });
        Country._m.on(this.input,'focus',function(event){
            if(that.input.value == '国家名' || that.input.value=='错误的IP数据库文件') that.input.value = '';
            event = event || window.event;
            if(!that.countryBox){
                that.createWarp();
            }else if(!!that.countryBox && Country._m.hasClass('hide',that.countryBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                // console.log("显示1");
                if(!that.ul || (that.ul && Country._m.hasClass('hide',that.ul))){
                    var div=that.rootDiv;
                    var inputPos = Country._m.getPos(that.input);
                    Country._m.removeClass('hide',that.countryBox);
                    div.style.left = inputPos.left + 'px';
                    div.style.top = inputPos.bottom  - 1 + 'px';
                    div.style.zIndex = 999999;
                    var myIframe=that.myIframe;
                    // console.log( that.arrParm)
                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Country._m.removeClass('hide',myIframe);
                    that.changeIframe();
                }
            }
            that.input.select();
        });
        //Country._m.on(this.input,'blur',function(){
        //    var value = Country._m.trim(that.input.value);
        //    if(value != ''){
        //        var reg = new RegExp('^'+value+'','gi');
        //        var flag=0;
        //        for (var i = 0, n = Country.allCity.length; i < n; i++) {
        //            var cou=Country.allCity[i];
        //            if (reg.exec(cou.nameCn) || reg.exec(cou.pinYin)) {
        //                flag++;
        //            }
        //        };
        //        if(flag==0){
        //            that.arrParm=null;
        //            that.callback(that.arrParm);
        //        }else{
        //            var lis = Country._m.$('li',that.ul);
        //            if(typeof lis == 'object' && lis['length'] > 0 && that.arrParm.length==0){
        //                var li = lis[0];
        //                var bs = li.children;
        //                var code=li.getAttribute('data-countryid');
        //                if(bs && bs['length'] > 1 ){
        //                    that.input.value = bs[0].innerHTML;
        //                    for(var ci in Country.allCity){
        //                        var cou=Country.allCity[ci];
        //                        if(cou.codeId==code){
        //                            that.arrParm=cou;
        //                            that.callback(that.arrParm);
        //                            break;
        //                        }
        //                    }
        //                }
        //            }else{
        //                that.callback(that.arrParm);
        //            }
        //        }
        //    }
        //
        //});
        Country._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Country._m.addClass('hide',that.countryBox);
            that.createUl();
            /* 移除iframe 的hide 样式 */
            Country._m.removeClass('hide',that.myIframe);
            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Country._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        var str;
        var value = Country._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var Countrys=Country.allCity;
            var searchResult = [];
            var regNew=new RegExp(''+value+'','g');
            //console.log(value);
            for(var cs in Countrys){
                var cou=Countrys[cs];
                if((cou.nameCn).indexOf(value)>-1 || (cou.pinYin.toLowerCase()).indexOf(value.toLowerCase())>-1){
                    if (searchResult.length !== 0) {
                        str = '<li data-countryid="'+cou.codeId+'"><b class="countryname">' + cou.nameCn + '</b><b class="countryspell">' + cou.nameEn + '</b></li>';
                    } else {
                        str = '<li class="on" data-countryid="'+cou.codeId+'"><b class="countryname">' + cou.nameCn + '</b><b class="countryspell">' + cou.nameEn + '</b></li>';
                    }
                    searchResult.push(str);
                    continue;
                };
            };

            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide mCustomScrollbar';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Country._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Country._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Country._m.addClass('hide',this.ul);
            this.ul.innerHTML="";
            Country._m.removeClass('hide',this.countryBox);
            Country._m.removeClass('hide',this.myIframe);
            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Country._m.$('li',this.ul),that=this;
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Country._m.removeClass('on',lis[i]);
                }
                Country._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Country._m.removeClass('on',lis[i]);
                }
                Country._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                var target=lis[this.count];
                var code=target.getAttribute('data-countryid');
                for(var yui in Country.allCity){
                    var cout=Country.allCity[yui];
                    if(cout.codeId==code){
                        that.input.value=cout.nameCn;
                        that.arrParm=cout;
                        // console.log('单击UL --》li');
                        that.callback(cout);
                        break;
                    }
                };
                Country._m.addClass('hide',this.ul);
                //Country._m.addClass('hide',this.ul);
                this.ul.innerHTML="";
                /* IE6 */
                Country._m.addClass('hide',this.myIframe);
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Country._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            Country._m.on(lis[i],'click',function(event){
                event = Country._m.getEvent(event);
                var target = Country._m.getTarget(event);
                var target = this;
                var code=target.getAttribute('data-countryid');
                for(var yui in Country.allCity){
                    var cout=Country.allCity[yui];
                    if(cout.codeId==code){
                        that.input.value=cout.nameCn;
                        that.arrParm=cout;
                        // console.log('单击UL --》li');
                        that.callback(cout);
                        break;
                    }
                };
                // that.input.value = Country.regExChiese.exec(target.innerHTML)[0];
                Country._m.addClass('hide',that.ul);
                that.ul.innerHTML='';
                /* IE6 下拉菜单点击事件 */
                Country._m.addClass('hide',that.myIframe);

            });
            Country._m.on(lis[i],'mouseover',function(event){
                event = Country._m.getEvent(event);
                var target = Country._m.getTarget(event);
                Country._m.addClass('on',target);
            });
            Country._m.on(lis[i],'mouseout',function(event){
                event = Country._m.getEvent(event);
                var target = Country._m.getTarget(event);
                Country._m.removeClass('on',target);
            });
        }
    }
};

