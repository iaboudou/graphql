export class components {
  CssComponent() {
    document.querySelector('link[href="./js/login/login.css"]')?.remove();
    let css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "./js/profile/profile.css";
    document.head.append(css);

    document.body.innerHTML = "";
  }

  logoutComponenet() {
    let body = document.body;
    body.innerHTML = `
      <nav id="bar">
          <button id="logout" type="button"></button>
      </nav>
        `;
  }

  barComponenet() {
    let bar = document.getElementById("bar");
    if (!bar) return;

    let div = document.createElement("div");
    div.innerHTML = `
      <ul id="bar-pages-wrapper">
        <li><a class="bar-element Basic-user-identification">user identification</a></li>
        <li><a class="bar-element XP-amount">XP amount</a></li>
        <li><a class="bar-element grades">grades</a></li>
        <li><a class="bar-element audits">audits</a></li>
        <li><a class="bar-element skills">skills</a></li>
      </ul>
    `;
    bar.append(div);
  }

  profileComponenet() {
    let m = document.createElement('main')
    m.innerHTML = `
   <section id="container_Basic_user_identification">

      <div id="profile_pic_name">
         <img id="avatarUrl">
         <span id="loginname"></span>
      </div>

      <ul>
        <li> <span> <strong>firstName    </strong> :</span> <span id="first-name">   </span> </li>
        <li> <span> <strong>lastName     </strong> :</span> <span id="last-name">    </span> </li>
        <li> <span> <strong>cochort      </strong> :</span> <span id="cochort">      </span> </li>
        <li> <span> <strong>date of birth</strong> :</span> <span id="date-of-birth"></span> </li>
        <li> <span> <strong>email        </strong> :</span> <span id="email">        </span> </li>
        <li> <span> <strong>city         </strong> :</span> <span id="city">         </span> </li>
        <li> <span> <strong>gender       </strong> :</span> <span id="gender">       </span> </li>
      </ul>

    </section>
    `
    document.body.append(m);

  }

  Basic_user_identification(data) {
        document.getElementById("avatarUrl").src = data?.data.user[0]?.attrs?.avatarUrl || '-'
        document.getElementById('first-name').textContent = data.data?.user[0]?.firstName || '-'
        document.getElementById('loginname').textContent = data.data?.user[0]?.login || '-'
        document.getElementById('cochort').textContent = data.data?.user[0]?.labels[0]?.labelName || '-'
        document.getElementById('last-name').textContent = data.data?.user[0]?.lastName || '-'
        document.getElementById('date-of-birth').textContent = data.data.user[0].attrs.dateOfBirth?.split('T')[0] || '-'
        document.getElementById('email').textContent = data.data?.user[0]?.attrs?.email || '-'
        document.getElementById('city').textContent = data.data?.user[0]?.attrs?.addressCity || '-'
        document.getElementById('gender').textContent = data.data?.user[0]?.attrs?.gender || '-'
  }

  XP_amountHTML(){
    let m = document.createElement('main')
    m.innerHTML = `
    <section id="svg_barchart">
      <svg id="bar_chart" viewBox="0 0 1500 500"></svg>
    </section>

    <section id="">
       <div id="xp-amount-total">
          <span>xp total:</span>
          <span id="totalXP"></span>
       </div>
     </section>
    `
     document.body.append(m);
  }

  XP_amount(data){
    let xp = data?.data?.xp?.aggregate?.sum?.amount || 0;
        let u = "B";
        if (xp >= 1000000) {
            xp = (xp / 1000000).toFixed(2);
            u = "MB";
        } else if (xp >= 1000) {
            xp = (xp / 1000).toFixed(2);
            u = "KB";
        }
        let el = document.getElementById('totalXP');
        if (el) el.textContent = xp + " " + u;
    }

    XP_graph(d){
      let data = structuredClone(d)
      let svg = document.getElementById('bar_chart')

      let w = 1200
      let h = 500
      let padding = 120

      let amounts = data.data.user[0].Transactions.map(e => e.amount).reverse()
      let max = Math.max(...amounts);

      // lines
      let lines = ""
      let x = max
      for (let i = 0; i <= h; i += 100) {
        if (i == 500) x= 0
        lines += `
          <text x="5" y="${i - 5}" fill="#070707">${x} B</text>
          <line x1="${padding}" y1="${i}" x2="1300" y2="${i}" stroke="#8d8d8d"></line>
        `;
        x -= max/5
      }
      svg.innerHTML = lines


      let barwidth = Math.max(w/amounts.length, 7)

      // barres
      let bars = ""
      let models = data.data.user[0].Transactions.reverse()
      amounts.forEach((val, i) => {
        let barHeigth = val * h/ max
        let x = i*barwidth
        let y = h - barHeigth
        bars += `
          <rect x="${x + padding}" y="${y}" width="${barwidth-5}" height="${barHeigth}" fill="#028ee0">
              <title>${models[i].object.name} : ${val} B</title>
          </rect>`;
      })

      svg.innerHTML += bars
    }

    AuditHTML(){
      let m = document.createElement('main')
    m.innerHTML = `
    <section id="svg_donut_chart">
        <svg id="donut_chart" width="300" height="300" viewBox="0 0 100 100">
            <circle r="47" cx="50" cy="50" fill="none" stroke="#028ee0" stroke-width="6"></circle>
            <circle id="svg-circle-failed" r="47" cx="50" cy="50" fill="none" stroke="#ff1f18" stroke-width="6" stroke-dasharray=""></circle>
        </svg>
     </section>
     <section id="description-circle-container">
        <span> <div id="svg-circle-s"></div> <div id= "s"></div> </span>
        <span> <div id="svg-circle-f"></div> <div id= "f"></div> </span>
     </section>
    `
     document.body.append(m);
    }

    Audit(data){
      let succeeded = data.data.audits[0].succeeded.aggregate.count
      let failed = data.data.audits[0].failed.aggregate.count

      let circonference = 47 * 2 * Math.PI
      document.getElementById('svg-circle-failed').setAttribute('stroke-dasharray', `${circonference * failed/ (succeeded+ failed)} ${circonference * succeeded/ (succeeded+ failed)}`);
    
      document.getElementById('s').innerText = `${succeeded} (${succeeded/(succeeded+failed)*100}%)  succeeded`
       document.getElementById('f').innerText = `${failed} (${failed/(failed+succeeded)*100}%)  failed`
    }
}
