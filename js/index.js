function delToAddr(obj){

    var _this= $(obj);
    _this.parent().remove();
//        var k=_this.attr('data-infos').split(',');
    var obj=$('#seltoaddrs').find('[data-toaddr]');
    if(!!obj.length){
        obj=obj.eq(0);
        var j=obj.attr('data-infos').split(',');
        $('[jsdo="outToArea_cityName"]').val(j[0]);
        $('[jsdo="outToArea_cityCode"]').val(j[1]);
        $('[jsdo="outToArea_cityId"]').val(j[2]);
    }else{
        $('[jsdo="outToArea_cityName"]').val('');
        $('[jsdo="outToArea_cityCode"]').val('');
        $('[jsdo="outToArea_cityId"]').val('');
    }
    selectToAddrStr();
}
function selectToAddrStr(){
    $("#log").val('');
    var selects= $("#selectToAddrs"),str="";
//
    $("#seltoaddrs [data-toaddr]").each(function(){
        str+=$(this).attr("data-toaddr")+",";
    });
//
    $("#log").val(str);
}
function replaceAll(str,a,b)
{

    while(str.indexOf(a)>-1)
    {  str = str.replace(a,b);
    }
    return str;
}

var index1=0;
var index3=0;
var wgurl="https://t.huodull.com/";
function clickme(obj){
    index1--;
    obj.parent().remove();
}
function clickme3(obj){
    index3--;
    obj.parent().remove();
}
$(function(){
    // 开始查询商务快递--end
    // $("input[jsdo='num']").autoNumeric(AutoNumericUtils.getAmtConfig());
    $("input[jsdo='num']").autoNumeric(AutoNumericUtils.getIntConfig());
    $("input[jsdo='wenum']").autoNumeric(AutoNumericUtils.getAmtConfig());

    //初始化
    $(".box_type>div").eq(0).css("background","none");
    // 点击切换
    $(".box_type>div").click(function(){
        var otherdiv=$(this).siblings();
        var index=$(this).index();

        $(this).css("background","none");
        $(this).find('img').show();
        otherdiv.css("background-color","#1d89c2");
        $(".box_content>div").eq(index).show().siblings().hide();
    })

    // 商务快递

    var test1=new Country.CitySelector({input:'outToTextNew',callback:function (obj) {
//        console.log(obj);
//        console.log(obj);
        var that=$(this.input);
        if(obj){
            that.siblings('#outToTextE').val(obj.nameCn+','+obj.nameEn);
            that.siblings('[name="t1"]').val(obj.nameCn);
            that.siblings('[name="t2"]').val(obj.codeId);
            that.siblings('[name="t1c"]').val(obj.nameEn);
            that.siblings('[name="secondWord"]').val(obj.nationalCode);
            return false;
        }
        that.siblings('#outToTextE').val('');
        that.siblings('[name="t1"]').val('');
        that.siblings('[name="t2"]').val('');
        that.siblings('[name="t1c"]').val('');
        that.siblings('[name="secondWord"]').val('');
    }});

    var city={
        initCity:function(id,cid){
            return{
                country:new Country.CitySelector({input:cid,callback:function (obj) {
                    $(this.countryBox).removeClass('hide')
                    this.input.value='';
                    if(!obj){
                        return false;
                    }
                    var addrs=$("#seltoaddrs"), addr=addrs.find('[data-toaddr="'+obj.nameCn+'"]');
                    if(addr.length>0){
                        return false;
                    }

                    var html='<span data-toaddr="'+obj.nameCn+'" data-infos="'+obj.nameCn+','+obj.nameEn+','+obj.codeId+'">'+obj.nameCn+'<b class="closetoaddr" onclick="window.delToAddr(this)">x</b> </span>';

                    $('#log').val('');
                    addrs.append(html);
                    if(addrs.find('[data-toaddr]').length==1){
                        $('[jsdo="outToArea_cityName"]').val(obj.nameCn);
                        $('[jsdo="outToArea_cityCode"]').val(obj.nameEn);
                        $('[jsdo="outToArea_cityId"]').val(obj.nationalCode);
                    }
                    selectToAddrStr();
                }
                }),
                city:new Vcity.CitySelector({input:id,callback:function (obj) {
                    console.log(obj);
                    if(obj.length==3){
                        $('[jsdo="outfromArea_provinceName"]').val(obj[0].areaName);
                        $('[jsdo="outfromArea_cityName"]').val(obj[1].areaName);
                        $('[jsdo="outfromArea_disName"]').val(obj[2].areaName);
                        $('[jsdo="outfromArea_provinceCode"]').val(obj[0].areaCode);
                        $('[jsdo="outfromArea_cityCode"]').val(obj[1].areaCode);
                        $('[jsdo="outfromArea_disCode"]').val(obj[2].areaCode);
                        $(this.input).siblings('#outfromTextE').val(obj[0].areaName+','+obj[1].areaName+','+obj[2].areaName);
                        $('#'+cid).focus();
                        return false;
                    };
                    $(this.input).siblings('#outfromTextE').val('');
                    $('[jsdo="outfromArea_provinceName"]').val('');
                    $('[jsdo="outfromArea_cityName"]').val('');
                    $('[jsdo="outfromArea_disName"]').val('');
                    $('[jsdo="outfromArea_provinceCode"]').val('');
                    $('[jsdo="outfromArea_cityCode"]').val('');
                    $('[jsdo="outfromArea_disCode"]').val('');
                }})
            }
        },
        editCity:function(id,cid){
            return {city:new Vcity.CitySelector({input:id,callback:function (obj) {
                if(obj.length==3) {
                    $('#' + cid).focus();
                }
            }}),
                count:new Country.CitySelector({input:cid,callback:function (obj) {
                    $(this.input).siblings('[data-to="outToArea"]').val(obj.nameCn+','+obj.nameEn);
                }})
            }
        }
    };
    window.pushCity=[];
    pushCity.push(city.initCity( 'outfromTextNew','selectToAddrsNew'));



    //FBA
    var test2=new Country.CitySelector({input:'outToTextNew3',callback:function (obj) {
//        console.log(obj);
//        console.log(obj);
        var that=$(this.input);
        if(obj){
            that.siblings('#outToTextE').val(obj.nameCn+','+obj.nameEn);
            that.siblings('[name="t1"]').val(obj.nameCn);
            that.siblings('[name="t2"]').val(obj.codeId);
            that.siblings('[name="t1c"]').val(obj.nameEn);
            that.siblings('[name="secondWord"]').val(obj.nationalCode);
            return false;
        }
        that.siblings('#outToTextE').val('');
        that.siblings('[name="t1"]').val('');
        that.siblings('[name="t2"]').val('');
        that.siblings('[name="t1c"]').val('');
        that.siblings('[name="secondWord"]').val('');
    }});

    var city2={
        initCity:function(id,cid){
            return{
                country:new Country.CitySelector({input:cid,callback:function (obj) {
                    $(this.countryBox).removeClass('hide')
                    this.input.value='';
                    if(!obj){
                        return false;
                    }
                    var addrs=$("#seltoaddrs"), addr=addrs.find('[data-toaddr="'+obj.nameCn+'"]');
                    if(addr.length>0){
                        return false;
                    }

                    var html='<span data-toaddr="'+obj.nameCn+'" data-infos="'+obj.nameCn+','+obj.nameEn+','+obj.codeId+'">'+obj.nameCn+'<b class="closetoaddr" onclick="window.delToAddr(this)">x</b> </span>';

                    $('#log').val('');
                    addrs.append(html);
                    if(addrs.find('[data-toaddr]').length==1){
                        $('[jsdo="outToArea_cityName"]').val(obj.nameCn);
                        $('[jsdo="outToArea_cityCode"]').val(obj.nameEn);
                        $('[jsdo="outToArea_cityId"]').val(obj.nationalCode);
                    }
                    selectToAddrStr();
                }
                }),
                city:new Vcity.CitySelector({input:id,callback:function (obj) {
                    console.log(obj);
                    if(obj.length==3){
                        $('[jsdo="outfromArea_provinceName"]').val(obj[0].areaName);
                        $('[jsdo="outfromArea_cityName"]').val(obj[1].areaName);
                        $('[jsdo="outfromArea_disName"]').val(obj[2].areaName);
                        $('[jsdo="outfromArea_provinceCode"]').val(obj[0].areaCode);
                        $('[jsdo="outfromArea_cityCode"]').val(obj[1].areaCode);
                        $('[jsdo="outfromArea_disCode"]').val(obj[2].areaCode);
                        $(this.input).siblings('#outfromTextE').val(obj[0].areaName+','+obj[1].areaName+','+obj[2].areaName);
                        $('#'+cid).focus();
                        return false;
                    };
                    $(this.input).siblings('#outfromTextE').val('');
                    $('[jsdo="outfromArea_provinceName"]').val('');
                    $('[jsdo="outfromArea_cityName"]').val('');
                    $('[jsdo="outfromArea_disName"]').val('');
                    $('[jsdo="outfromArea_provinceCode"]').val('');
                    $('[jsdo="outfromArea_cityCode"]').val('');
                    $('[jsdo="outfromArea_disCode"]').val('');
                }})
            }
        },
        editCity:function(id,cid){
            return {city:new Vcity.CitySelector({input:id,callback:function (obj) {
                if(obj.length==3) {
                    $('#' + cid).focus();
                }
            }}),
                count:new Country.CitySelector({input:cid,callback:function (obj) {
                    $(this.input).siblings('[data-to="outToArea"]').val(obj.nameCn+','+obj.nameEn);
                }})
            }
        }
    };
    window.pushCity=[];
    pushCity.push(city.initCity( 'outfromTextNew3','selectToAddrsNew'));

    













    // 切换商务快递，电商小包，FBA
    $("[js-do='typeOpt']").find("a").click(function(){
        $("[js-do='typeOpt']").find("a").removeClass("index");
        $(this).addClass("index")
        var index=$(this).attr("index");

        $(".type_send_content>div").hide();
        $(".type_send_content>div").eq(index).show();

    })
    //校验单号规则
    // 查询单号
    var checkexpress=/^566[\d]{9}$/;
   $("[js-do='searchNum']").click(function(){
       if(checkexpress.test($(".trackNum").val())){
           window.location =wgurl+"front/expressSingle/index.html?expressId="+$(".trackNum").val()+"&comCode=HUODULL"

//            $.get("routerInfo.json",$("#expressForm").serialize(),function(data,status){
//                if(data.success)
//                {
// //                       alert(0 != sta || 100011 == sta || 5 != sta || 3 != sta);
//                    if(null == data.state){
//                        alert(data.msg);
//                    }
// //                        console.log(data['obj'],data.success);
//                    if( null != data['obj'])
//                    {
//                        var timeHtml = '<p style="font-size: 18px;">时间</p>';
//                        var contextHtml = "";
//                        var obj = data['obj'];
//                        for(var i in obj.traces)
//                        {
//                            var data = obj.traces;
//                            timeHtml += '<p>'+data[i].acceptTime+'</p>'
//                            if(0 == i)
//                            {
//                                contextHtml += '<p class="hover"><span>'+ data[i].acceptStation +'</span></p>';
//
//                            }else{
//                                contextHtml += '<p>'+ data[i].acceptStation +'</p>'
//                            }
//
//                        }
// //                            console.log(timeHtml);
//                        $('.cxin_sad_dad_left').html(timeHtml);
//                        $('.cxin_sad_dad_right li:first').html(contextHtml);
//                        $('.crxin_sad_dad').show();
//                    }
//                }else{
//
//                    alert(data.msg);
//                }
//            });
           return
       }else if($(".trackNum").val()==""){
           alert("请输入货兜单号")
           return
       }else{
           alert("请输入正确货兜单号")
           return
       }
       
   })

    // 开始查询商务快递
    $("[js-do='queryBus']").click(function(){
        var outfromArea_cityName = $("#BusinessForm #outfromTextNew").val();
        if (outfromArea_cityName == '') {
            alert("未选择起始地");
            return false;
        }

        var outToArea_cityName = $("#BusinessForm #outToTextNew").val();
        if (outToArea_cityName == '') {
            alert("未选择目的地");
            return false;
        }

        var length = $("#BusinessForm input[name='ds[0].l']:eq(0)").val();
        if (length == '') {
            alert("未填写长度");
            return false;
        }

        var width = $("#BusinessForm input[name='ds[0].wi']:eq(0)").val();
        if (width == '') {
            alert("未填写宽度");
            return false;
        }

        var high = $("#BusinessForm input[name='ds[0].h']:eq(0)").val();
        if (high == '') {
            alert("未填写高度");
            return false;
        }


        var weight = $("#BusinessForm input[name='ds[0].we']:eq(0)").val();
        if (weight == '') {
            alert("未填写重量");
            return false;
        }
        var boxnum=$("#BusinessForm input[name='ds[0].q']:eq(0)").val();
        if (boxnum == '') {
            alert("未填写几箱");
            return false;
        }

        var postdata = $.formHelper.getObject($('#BusinessForm').serialize());

        var postDataStr = JSON.stringify(postdata);
        console.info(postDataStr)

        var base64data = BASE64.encoder(postDataStr);

        base64data = replaceAll(base64data, "=", "-00");
        base64data = replaceAll(base64data, "+", "-01");
        base64data = replaceAll(base64data, "/", "-02");
        var url="";

            url= "2.0/packExpress" + base64data + ".html";

        // hd.cookie.set({name:"fLogin",
        //     value:url
        // });
        window.location =wgurl+url;

    })



    // 重置商务快递
    $("a[jsdo='resetOut']").on("click",function(){
        var parent=$(this).parents("ul");
        $("#BusinessForm input[jsdo='wenum']").val('1.00');
        $("#BusinessForm .zl").val('0.50');
        $("#BusinessForm input[name='ds[0].q']").val('1');

    });

    // 重置商务快递--end

    // FBA
    $("[jsdo='queryFba']").click(function(){

        var outfromArea_cityName = $("#FbaForm #outfromTextNew3").val();
        if (outfromArea_cityName == '') {
            alert("未选择起始地");
            return false;
        }

        var outToArea_cityName = $("#FbaForm #outToTextNew3").val();
        if (outToArea_cityName == '') {
            alert("未选择目的地");
            return false;
        }

        var parent = $(this).parents("ul");
        var high = $("#FbaForm input[name='ds[0].h']:eq(0)").val();
        if (high == '') {
            alert("未填写高度");
            return false;
        }
        var width = $("#FbaForm input[name='ds[0].wi']:eq(0)").val();
        if (width == '') {
            alert("未填写宽度");
            return false;
        }
        var length = $("#FbaForm input[name='ds[0].l']:eq(0)").val();
        if (length == '') {
            alert("未填写长度");
            return false;
        }
        var weight = $("#FbaForm input[name='ds[0].we']:eq(0)").val();
        if (weight == '') {
            alert("未填写重量");
            return false;
        }
        var boxnum=$("#FbaForm input[name='ds[0].q']:eq(0)").val();
        if (boxnum == '') {
            alert("未填写几箱");
            return false;
        }

        var postdata = $.formHelper.getObject($('#FbaForm').serialize());
        var postDataStr = JSON.stringify(postdata);
        console.info(postDataStr)
        var base64data = BASE64.encoder(postDataStr);

        base64data = replaceAll(base64data, "=", "-00");
        base64data = replaceAll(base64data, "+", "-01");
        base64data = replaceAll(base64data, "/", "-02");
        var url="";
            url= "2.0/packExpress" + base64data + ".html?type=FBA";


        // hd.cookie.set({name:"fLogin",
        //     value:url
        // });
        window.location =wgurl+url;


    })
    //重置FBA
    $("a[jsdo='resetOutFba']").on("click",function(){
        var parent=$(this).parents("ul");
        $("#FbaForm input[jsdo='wenum']").val('1.00');
        $("#FbaForm .zl").val('0.50');
        $("#FbaForm input[jsdo='num']").val('1');
    });



    // 电商小包
    var city3={
        initCity:function(id,cid){
            return{
                country:new Country.CitySelector({input:cid,callback:function (obj) {
                    $(this.countryBox).removeClass('hide')
                    this.input.value='';
                    if(!obj){
                        return false;
                    }
                    var addrs=$("#seltoaddrs"), addr=addrs.find('[data-toaddr="'+obj.nameCn+'"]');
                    if(addr.length>0){
                        return false;
                    }

                    var html='<span data-toaddr="'+obj.nameCn+'" data-infos="'+obj.nameCn+','+obj.nameEn+','+obj.codeId+'">'+obj.nameCn+'<b class="closetoaddr" onclick="window.delToAddr(this)">x</b> </span>';
                    $('#log').val('');
                    addrs.append(html);
                    if(addrs.find('[data-toaddr]').length==1){
                        $('[jsdo="outToArea_cityName"]').val(obj.nameCn);
                        $('[jsdo="outToArea_cityCode"]').val(obj.nameEn);
                        $('[jsdo="outToArea_cityId"]').val(obj.nationalCode);
                    }
                    selectToAddrStr();
                }
                }),
                city:new Vcity.CitySelector({input:id,callback:function (obj) {
                    console.log(obj);
                    if(obj.length==3){
                        $('[jsdo="outfromArea_provinceName"]').val(obj[0].areaName);
                        $('[jsdo="outfromArea_cityName"]').val(obj[1].areaName);
                        $('[jsdo="outfromArea_disName"]').val(obj[2].areaName);
                        $('[jsdo="outfromArea_provinceCode"]').val(obj[0].areaCode);
                        $('[jsdo="outfromArea_cityCode"]').val(obj[1].areaCode);
                        $('[jsdo="outfromArea_disCode"]').val(obj[2].areaCode);
                        $(this.input).siblings('#outfromTextE').val(obj[0].areaName+','+obj[1].areaName+','+obj[2].areaName);
                        $('#'+cid).focus();
                        return false;
                    };
                    $(this.input).siblings('#outfromTextE').val('');
                    $('[jsdo="outfromArea_provinceName"]').val('');
                    $('[jsdo="outfromArea_cityName"]').val('');
                    $('[jsdo="outfromArea_disName"]').val('');
                    $('[jsdo="outfromArea_provinceCode"]').val('');
                    $('[jsdo="outfromArea_cityCode"]').val('');
                    $('[jsdo="outfromArea_disCode"]').val('');
                }})
            }
        },
        editCity:function(id,cid){
            return {city:new Vcity.CitySelector({input:id,callback:function (obj) {
                if(obj.length==3) {
                    $('#' + cid).focus();
                }
            }}),
                count:new Country.CitySelector({input:cid,callback:function (obj) {
                    $(this.input).siblings('[data-to="outToArea"]').val(obj.nameCn+','+obj.nameEn);
                }})
            }
        }
    };
    window.pushCity=[];
    pushCity.push(city.initCity( 'outfromTextNew2','selectToAddrsNew'));

    var countryInfosChis=[];
    var countryInfosEngs=[];
    var countryInfosC=[];
    var countryInfos=[];

    $("[jsdo='persontime']").focus(function(){
        $(".personTime").click();;
    })


    $("[jsdo='queryOline']").click(function(){
         countryInfos=[];
         countryInfosChis=[];
         countryInfosEngs=[];
         countryInfosC=[];

        var outfromArea_cityName = $("#OnlineForm #outfromTextNew2").val();
        if (outfromArea_cityName == '') {
            alert("未选择起始地");
            return false;
        }
        
        var guojias = $("#OnlineForm .toaddrs span");
        if(guojias.length==0){
            alert("未选择目的地");
            return false;
        }
        for(var i=0;i<guojias.length;i++) {
            countryInfos.push($(guojias[i]).data("infos"));
        }
        for(var i=0;i<countryInfos.length;i++){
            var info=countryInfos[i].split(",");
            countryInfosChis.push(info[0])
            countryInfosEngs.push(info[1])
            countryInfosC.push(info[2])
            console.log(countryInfosC)
        }
        $(".toaddrs").find("[name='t1']").val(countryInfosChis.join(","))
        $(".toaddrs").find("[name='t1c']").val(countryInfosEngs.join(","))
        $(".toaddrs").find("[name='t2']").val(countryInfosC.join(","))

        var parent = $(this).parents("ul");
        var high = $("#OnlineForm input[name='ds[0].h']:eq(0)").val();
        if (high == '') {
            alert("未填写高度");
            return false;
        }
        var width = $("#OnlineForm input[name='ds[0].wi']:eq(0)").val();
        if (width == '') {
            alert("未填写宽度");
            return false;
        }
        var length = $("#OnlineForm input[name='ds[0].l']:eq(0)").val();
        if (length == '') {
            alert("未填写长度");
            return false;
        }
        var weight = $("#OnlineForm input[name='ds[0].we']:eq(0)").val();
        if (weight == '') {
            alert("未填写重量");
            return false;

        }
        var boxnum=$("#OnlineForm input[name='ds[0].q']:eq(0)").val();
        if (boxnum == '') {
            alert("未填写几箱");
            return false;
        }

        if($("[jsdo='persontime']").eq(0).val()>$("[jsdo='persontime']").eq(1).val()){
            $(".personTime").val($("[jsdo='persontime']").eq(0).val())
            $("[name='minTime']").val($("[jsdo='persontime']").eq(1).val())
        }else{
            $(".personTime").val($("[jsdo='persontime']").eq(1).val())
            $("[name='minTime']").val($("[jsdo='persontime']").eq(0).val())
        }
        if(!$(".personTime").is(':checked')){
            $("[name='minTime']").val(0)
        }

        var postdata = $.formHelper.getObject($('#OnlineForm').serialize());


        var postDataStr = JSON.stringify(postdata);

        postDataStr = replaceAll(postDataStr, "%2C", ",");
        console.log(postDataStr)
        var base64data = BASE64.encoder(postDataStr);
        base64data = replaceAll(base64data, "=", "-00");
        base64data = replaceAll(base64data, "+", "-01");
        base64data = replaceAll(base64data, "/", "-02");

        window.location.href=wgurl+"2.0/packExpressYz.html?base64data="+base64data;


    })

    var personTime="";
    $("[jsdo='persontime']").focus(function(){
        $(".personTime").attr("checked","checked")
    })



    
    $("[jsdo='resetOline']").click(function(){
       
        $("#OnlineForm input[jsdo='wenum']").val('1.00');
        $("#OnlineForm input[name='ds[0].we']").val('200.00');
        
    })


    $("#BusinessForm .removenum").hide();
    $("#FbaForm .removenum").hide();
    $("[jsdo='addboxnum']").eq(0).click(function(){
        index1++;
        var html=$("#BusinessForm .size").eq(0).html();
        html=replaceAll(html,"ds[0]","ds["+index1+"]");
        $("#BusinessForm .size").eq(0).after(
            '<li class="size">'+
            html+'</li>'
        )

        $(".addboxnum").hide();
        $(".addboxnum").eq(0).show()
        $("#BusinessForm .removenum").show();
        $("#BusinessForm .removenum").eq(0).hide();

    })


    $("[jsdo='addboxnum3']").eq(0).click(function(){
        index3++;
        var html=$("#FbaForm .size").eq(0).html();
        html=replaceAll(html,"ds[0]","ds["+index3+"]");
        $("#FbaForm .size").eq(0).after(
            '<li class="size text-center" style="margin-left: -2px">'+
            html+'</li>'
        )
        $(".addboxnum3").hide();
        $(".addboxnum3").eq(0).show()
        $("#FbaForm .removenum").show();
        $("#FbaForm .removenum").eq(0).hide();


    })


















});