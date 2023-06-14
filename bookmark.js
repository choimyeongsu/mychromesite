const newBookmarkForm = document.getElementById("bookmark-item-input-form");
const bookmarkItemList = document.getElementById("bookmark-list");
let bookmarkList=[];
if(localStorage.getItem("bookmarkList")){
    bookmarkList=JSON.parse(localStorage.getItem("bookmarkList"));
}
else{
    localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));
}
const addBookmarkItem=()=>{
    let bookmarkList=[];
    if(localStorage.getItem("bookmarkList")){
        bookmarkList=JSON.parse(localStorage.getItem("bookmarkList"));
    }
    let name = document.getElementById("new-bookmark-name-input").value;
    let url = document.getElementById("new-bookmark-url-input").value;
    let createAt=Date.now();
    bookmarkList.push({name:name,url:url,createAt:createAt});
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    document.getElementById("new-bookmark-name-input").value="";
    document.getElementById("new-bookmark-url-input").value="";
    setBookmarkItem({name:name, url:url, createAt:createAt});
    newBookmarkToggle();
}
let isAddButtonClick = false;
newBookmarkForm.style.display="none";

const newBookmarkToggle = () =>{
    isAddButtonClick=!isAddButtonClick;
    isAddButtonClick ? (newBookmarkForm.style.display="block") : (newBookmarkForm.style.display="none");
}

const deleteBookmarkItem= (id) =>{
    const isDelete = window.confirm("정말 삭제하시겠습니까?");
    if(isDelete)
    {
        let bookmarkList=JSON.parse(localStorage.getItem("bookmarkList"));
        let nowBookmarkList=bookmarkList.filter((elm)=>elm.createAt!==id);
        localStorage.setItem("bookmarkList", JSON.stringify(nowBookmarkList));
        document.getElementById(`bookmark-item-${id}`).remove();
        return;

    }
}
const setBookmarkItem=(item)=>{
    const bookmarkItem = document.createElement("div");
    bookmarkItem.classList.add("bookmark-item");
    bookmarkItem.id=`bookmark-item-${item.createAt}`;

    //bookmarkInfo 안에는 북마크 아이콘과, 이름
    const bookmarkInfo = document.createElement("div");
    bookmarkInfo.classList.add("bookmarkInfo");
    
    //북마크의 주소를 나타내는 
    const bookmarkUrl = document.createElement("a");
    bookmarkUrl.classList.add("bookmark-url");
    
    //북마크 아이템의 이름 앞에 표시될 아이콘
    const urlIcon = document.createElement("div");
    urlIcon.classList.add("url-icon");
    
    
    const urlIconimg=document.createElement("img");
    
    //북마크 아이템의 이름이 적힐곳
    const nameElement=document.createElement("div");
    nameElement.classList.add("url-name");

    //bookmark-item은 info와 삭제버튼으로 이루어짐
    const bookmarkDelBtn = document.createElement("div");
    bookmarkDelBtn.classList.add("del-btn");
    bookmarkDelBtn.textContent = "삭제";
    bookmarkDelBtn.addEventListener("click",()=>{
        deleteBookmarkItem(item.createAt);
    });

    bookmarkUrl.href=item.url;
    urlIconimg.src = `https://www.google.com/s2/favicons?domain_url=${item.url}`;
    nameElement.textContent=item.name;

    bookmarkItem.appendChild(bookmarkInfo);
    bookmarkItem.appendChild(bookmarkDelBtn);
    bookmarkInfo.appendChild(bookmarkUrl);
    bookmarkUrl.appendChild(urlIcon);
    bookmarkUrl.appendChild(urlIconimg);

    bookmarkItemList.appendChild(bookmarkItem);

    



};

const setBookmarkList=()=>{
     bookmarkList.forEach((item)=>{
        setBookmarkItem(item);
     });
};

setBookmarkList();
document.getElementById("bookmark-item-add-btn").addEventListener("click", newBookmarkToggle);
document.getElementById("add-btn").addEventListener("click",addBookmarkItem);
document.getElementById("cancel-btn").addEventListener("click", newBookmarkToggle);
