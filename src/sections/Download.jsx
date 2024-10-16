import logo from '../assets/gameTheory.webp';

const Download = () => {
  return (
    <section>
      <div
        name="download"
        className="g7 relative pb-32 pt-24 hidden md:block max-lg:pb-24 max-md:py-16"
      >
        <div className="container">
          <div className="flex items-center">
            <div className="relative mr-[-30vh] flex-540 max-xl:flex-280 max-lg:flex256 max-md:flex-100">
              <ul className="flex flex-wrap  items-center gap-6">
                <li className="download_tech-link download_tech-link_last-before download_tech-link_last-after">
                 

                  <span className="download_tech-icon  hidden lg:block ">
                    {" "}
                    <img
                      src={logo}
                      width={160}
                      height={55}
                      alt="xora"
                    />
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-10 max-md:hidden">
              <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s5 p-6">
                <div className="relative rounded-3xl bg-s1 px-6 pb-6 pt-14">
                  <span className="download_preview-dot left-6 bg-p2" />
                  <span className="download_preview-dot left-11 bg-s3" />
                  <span className="download_preview-dot left-16 bg-p1/15" />

                  <img
                    src="/images/screen.png"
                    width={855}
                    height={655}
                    alt="screen"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Download;
