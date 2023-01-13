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

          <p className="p">What Kind of output do you want?</p>

          <div className="select-option">
            <select className=" p" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div className="input-radio">
            <input type="radio" id="to-the-point" name="detail" value="to-the-point" />
            <label for="to-the-point" className="p">
              To-The-Point
            </label>
          </div>

          <div className="input-radio">
            <input type="radio" id="concise" name="detail" value="concise" />
            <label for="concise" className="p">
              Concise
            </label>
          </div>

          <div className="input-radio">
            <input type="radio" id="detailed" name="detail" value="detailed" />
            <label for="detailed" className="p">
              Detailed
            </label>
          </div>
        </form>

        <button className="primary-btn p">Generate Summary</button>
      </div>
    </>
  );
}
