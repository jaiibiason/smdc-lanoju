// import '../App.css'
// import '../css/Hero.css'

function Youtube() {
  return (
    <>
    <div className="more-youtube-bg">
      <section className="more-youtube">
        <div className="left-cont">
          <h1>More On My Youtube</h1>
          <p>
            Stay informed with expert real estate insights, property tours, and
            investment tips. Subscribe now and never miss an update!
          </p>
          <a
            href="https://www.youtube.com/@condoventuresbyJustineLanoza/featured"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inquire-btn">Watch On My Youtube Channel</button>
          </a>
        </div>
        <div className="right-cont">
          <iframe
            src="https://www.youtube.com/embed/bRaifJ9f38Q?si=0ZCTEXc8GP_AcGDN"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </section>

    </div>

      <style>
        {`
          .more-youtube-bg {
            background-color: #f9f9f9;}
          .more-youtube {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 40px;
            background-color: #f9f9f9;
            font-family: 'Inter', sans-serif;
            height: auto;
          

          .left-cont {
            flex: 1;
          }

          .left-cont h1 {
            // font-size: 36px;
            color: var(--dark-blue);
          }

          .left-cont p {
            // font-size: 16px;
            font-family: 'Inter', sans-serif;
          }

          .inquire-btn {
            color: var(--dark-blue);
            background-color: white;
            border: var(--dark-blue) 1px solid;
            }
            .inquire-btn:hover {
            color: white;
            background-color: var(--dark-blue);
            border: 1px solid white;
          }

          .right-cont {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: auto;
          }

          .right-cont iframe {
            width: 100%;
            height: 315px;
            max-width: 560px;
            border: none;
          }
        }

          @media (max-width: 768px) {
            .more-youtube {
              flex-direction: column;
              gap: 30px;
            

              .left-cont, .right-cont {
                width: 100%;
              }

              .right-cont iframe {
                width: 100%;
                height: auto;
                aspect-ratio: 16 / 9;
              }
            }
          }

        @media (max-width: 480px) {
            .more-youtube {

              .left-cont h1 {
                font-size: 36px;
                color: var(--dark-blue);
              }

              .left-cont p {
                font-size: 12px;
              }

              .left-cont button {
                width: 100%;
              }
              
              .right-cont iframe {
              aspect-ratio: 1/1 ;
              
              }

            }
          }
        `}
      </style>
    </>
  );
}

export default Youtube;
