//@refresh

import HomeFourMain from "@/components/home-four/HomeFourMain";
import IndexMain from "@/components/index/IndexMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";

const Home = () => {
  return (
    <>
      <MetaData pageTitle="Wellcome To Tourigo">
        <Wrapper>
          <main>
            <HomeFourMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default Home;
