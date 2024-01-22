var originalname;
var dataLimit=10;
var form= document.getElementById("myform");
form.addEventListener("submit", function(e){
    e.preventDefault() //prevent form auto submission of form.
    var search = document.getElementById('search').value;
    originalname=search.split(' ').join('');
    defaultRender(originalname)
})

function defaultRender(originalname){
    if(!originalname){
        originalname="Developer200010";
    }
        // console.log(originalname)
        fetch("https://api.github.com/users/"+originalname)
        .then((result)=>result.json())
        .then((data)=>{
            // console.log(data)
            document.getElementById("username").innerHTML=data.login;
            document.getElementById("bio").innerHTML=data.bio;
            document.getElementById("location").innerHTML=data.location;
            document.getElementById("location").innerHTML=`
            <a href=${data.html_url} class="btn btn-danger" id="url">GitHub Account</a>
            `;
            document.getElementById("img").innerHTML=`
            <div class="card-img-top ">
            <img c src=${data.avatar_url} alt="..." class="img-fluid" style="width: 18rem; height: 18rem; border-radius: 50%;">
        </div>     
            `
            fetchRepo(1,originalname);
            const totalRepo=data.public_repos;
            let num_of_page=totalRepo/dataLimit;
            if(num_of_page%1!==0){
              num_of_page=num_of_page-num_of_page%1 + 1;
            }

            var pageNumber="";           
            for(var i=1; i<=num_of_page;i++){
                pageNumber+=`
                <li class="page-item page-link" class="cursor-pointer" onClick="fetchRepo(${i},'${originalname}')">${i}</li>
                `
                // console.log(pageNumber)
            }
            document.getElementById('pagination').innerHTML=pageNumber;
           
        })
    }
defaultRender()

function fetchRepo(pageNum=1,originalname="Developer200010", dataLimit=10){
    document.getElementById("repo").innerHTML=`
   <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
    <span class="sr-only"></span></span>
    </div>
   </div>
    `
    fetch(`https://api.github.com/users/${originalname}/repos?per_page=${dataLimit}&page=${pageNum}`)
    .then((response)=>response.json())
    .then(async (data)=>{
        // console.log(data,"repo")
        // document.getElementById("reponame").innerHTML=data.name;
        var repos='';
        for(var eachRepo of data){
            let allLanguages=await fetchAllLanguage(originalname,eachRepo?.name);
            allLanguages=Object.keys(allLanguages);    
            let repo_lan=''; 
            for(var lan of allLanguages){ 
                    repo_lan += `
                    <span href="#" id="lan" class="btn btn-primary">${lan}</span>
                    `
                 } 
           
          repos +=`
            <div class="col-sm-6 mb-3 mb-sm-0 p-4 ">
                  <div class="card">
                    <div class="card-body p-4">
                      <h5 class="card-title">${eachRepo?.name}</h5>
                      <p class="card-text">${eachRepo?.description}</p>
                     ${repo_lan? repo_lan: null}
                    </div>
                  </div>
                </div>
            `
        }
        document.getElementById('repo').innerHTML=repos;      
    })
}
fetchRepo()

async function fetchAllLanguage(originalname,reponame){
    let data = fetch(`https://api.github.com/repos/${originalname}/${reponame}/languages`)
    .then((result)=>result.json())
    return data;
}
