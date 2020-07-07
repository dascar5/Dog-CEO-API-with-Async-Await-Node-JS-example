//koristicemo dog.ceo api da uhvatimo random sliku psa i sacuvamo je u txt fajl
const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("Success"); //nemamo datu da vratimo, zato samo loguj success
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro("./starter/dog.txt");
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    //vraca body message iz svakog respro elementa
    console.log(imgs);
    //recimo da ocemo 3 slike od jednom, da ne bi radili await na svaku
    //i dodavali wait time, ovako sve 3 sacuva u varijable koje se onda
    //await u array

    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

/*
readFilePro("./starter/dog.txt")
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file");
  })
  .catch((err) => {
    console.log(err);
  });
  */

//kad se importuju/instaliraju npm paketi, vazda prvo npm init u terminal
//npm install superagent
//SA salje get request na url, dio u url sam zamijenio sa "data" da bi uzelo
//retriever iz dog.txt
//callback unutar callbacka
//kad smo dobili body message sa urlom psa, sad ocemo taj string url da sacuvamo u tekst fajl
//treci callback unutar callback nesta
//svaki callback ima funkciju (x, (data,err=>{}))
//promise implements a concept of a future value (expecting to recieve)
//sa .then, govorimo promisu sta da radi cim zavrsi zadatak
//catch se nadovezuje na then, to mi je error handler, da ne moram manuelno if da pisem
//then handles the successful case, dok catch hvata greske
//i dalje imamo 2 callbacka (2 fs) a samo jedan promise
//to rijesavamo ovako
//we will promisify read/write fs
//sve sto pasujemo u resolve je resenje za funkciju ukoliko uspjesna, reject je za error handling
//tehnicki smo napravili promise verziju read file
//sad za write
//chaining promises (dobijemo prvi promise, odma na njega vezemo then, pa sledeci)
//async/await, uglavnom pisemo asynchronous funkciju,a await da nam odradi zadato, najlaksi nacin
//umjesto then sa callbackom, kod izgleda vise sync, a u stvari je async
//await ispred promisa, ceka se rezultat
