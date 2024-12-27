import Sidebar from "@views/website/sidebar/sidebar";
import HomePage from "@views/website/home/home";
import HeaderWebsite from "@views/website/header/header";
import "@css/website/layout.css";

const LayoutWebsite = () => {
  return (
    <>
      <div>
        <header className="header">
          <HeaderWebsite />
        </header>
        <main className="main">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content_oulet">
            <HomePage />
          </div>
        </main>
      </div>
    </>
  );
};

export default LayoutWebsite;
