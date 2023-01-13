import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <form action="">
          <textarea
            className="p text-atea"
            name=""
            id=""
            placeholder="write your message."
            cols="10"
            rows="8"
          ></textarea>
        </form>

        <p className="p">What Kind of output do you want?</p>

        <div className="select-option">
          <select className=" p" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        <button className="primary-btn p">Generate Summary</button>
      </div>
    </>
  );
}
