function composeEmail(email, subject, message, message2) {
    return new Promise((resolve)=> {
        document.querySelector('input.agP.aFw').value = email
        document.querySelector('input[name="subjectbox"]').value = subject
        const divElement = document.querySelector('div.Am.Al.editable.LW-avf.tS-tW')
        const first = divElement.firstChild;
        const gapLineBreak = document.createElement("br");
        const newText1 = document.createTextNode(message);
        const newText2 = document.createTextNode(message2);
        divElement.insertBefore(newText1, first);
        divElement.insertBefore(gapLineBreak, newText1.nextSibling);
        const extraSpace1 = document.createElement("br");
        divElement.insertBefore(extraSpace1, gapLineBreak.nextSibling);
        divElement.insertBefore(newText2, extraSpace1.nextSibling);
        const extraSpace2 = document.createElement("br");
        divElement.insertBefore(extraSpace2, newText2.nextSibling);
        const linkElement = document.createElement("a");
        linkElement.textContent = "Resume_Junith";
        linkElement.href = "https://drive.google.com/file/d/1Sj4baoWqohTFjdczYRxPlwb6ab_ywlbb/view?usp=drive_link";
        first.insertAdjacentElement('afterend',linkElement)
        const extraSpace3 = document.createElement("br");
        const extraSpace4 = document.createElement("br");
        divElement.insertBefore(extraSpace3, linkElement.nextSibling);
        divElement.insertBefore(extraSpace4, linkElement.nextSibling);
        const newText3 = document.createTextNode("Thanks & Regards");
        divElement.insertBefore(newText3, extraSpace3.nextSibling);
        const divElement1 = document.querySelector('.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3');
        divElement1.addEventListener('click', function onClick(){
            divElement1.removeEventListener('click', onClick);
            resolve();
        })
    })
    
    
    //CLICK
    // const divElement1 = document.querySelector('.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3');
    // setTimeout(()=>{
    //     const clickEvent = new MouseEvent("click", {
    //         bubbles: true,
    //         cancelable: true,
    //         view: window,
    //         buttons: 1,
    //     });
    //     divElement1.dispatchEvent(clickEvent);
    // },5000)
}

async function clickComposeButton() {
    const composeButton = document.querySelector('div[role="button"][jsaction="click:dlrqf; clickmod:dlrqf"]');
    if (composeButton) {
        const spreadsheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSONf7s0KLtlJavZGuHYXxs79fM1ElXdOyhj84tc-PyKc0MMV0N1BFgCq_V1ZgDBN8nBCKlELkDn9KE/pubhtml';
        let columnsToExtract = [1, 2, 3, 4]; 
        let rowsToExtract = [1]; 

        fetch(spreadsheetURL)
            .then(response => response.text())
            .then(async(data) =>{
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                const table = tempDiv.querySelector('table');
                let email, message, message2, company_name, person_name;
                let subject = "Regarding Software Engineer Internship Opportunities";
        
                for (let i = 1; i < table.rows.length; i++) {
                    const row = table.rows[i].cells;
                    console.log(row[columnsToExtract[3]].textContent)
                    if(row[columnsToExtract[3]].textContent=="no"){
                        composeButton.click();

                        // Introduce a delay of 5 seconds
                        await new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            }, 2000);
                        });


                        if (row.length > 2) {
                            email = row[columnsToExtract[0]].textContent;
                            company_name = row[columnsToExtract[1]].textContent;
                            person_name = row[columnsToExtract[2]].textContent;
                            message = `Hello ${person_name},`
                            message2 = `I'm Junith, an Undergrad at IIIT, and I'm really into Software Development. I love this field because I believe it offers a lot of opportunities for learning, and I'm a hands-on learner -- I learn best by doing things. I'm good with React.js, Node.js and Databases. That's why I'm reaching out to you for an internship which soon could be converted to a Full Time Opportunity based on my performance at ${company_name} -- I'm attaching my Resume here for you to have a look at it. I believe I'd be a great fit, and I'd love to chat more about how I can help ${company_name}.`
                            console.log(email);
                            console.log(subject);
                            console.log(message);

                            await composeEmail(email, subject, message, message2);
                            await new Promise((resolve) => {
                                setTimeout(() => {
                                resolve();
                                }, 2000);
                            });
                        }
                    }
                }
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('data').textContent = 'Error fetching data.';
        });
    }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "runMyFunction") {
        clickComposeButton();
    }else{
        console.log("new")
    }
});
  