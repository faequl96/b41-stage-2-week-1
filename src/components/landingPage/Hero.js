import { Container, Image } from "react-bootstrap";
import hero from '../../assets/hero.png';

const style = {
    Container: {
        padding : "0 90px",
        marginTop : "40px",
        marginBottom : "40px"
    }
  }

export const Hero = () => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));

    return (
        <Container
            className="position-relative"
            style={style.Container}
        >
            <div className="mb-4">
                <Image src={hero} width="100%"></Image>
            </div>
            {isLogin ? (
                <>
                    {userLogin.role === 'user' ? (
                        <div className="position-absolute" style={{ fontSize: "1.15rem", color: "white", top: "60px", left: "160px", width: "36%" }}>
                            <h1 className="fs-1 fw-bolder mb-4">WAYSBUCKS</h1>
                            <p style={{ fontSize: "1.3rem" }}>Things are changing, but we're still here for you</p>
                            <p>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
                            <p>Let's Order...</p>
                        </div>
                    ) : (
                        <div className="position-absolute" style={{ fontSize: "1.15rem", color: "white", top: "160px", left: "160px", width: "36%" }}>
                            <h1 className="fw-bolder" style={{ fontSize: "4.5rem" }}>WAYSBUCKS</h1>
                        </div>
                    )}
                </>
            ) : (
                <div className="position-absolute" style={{ fontSize: "1.15rem", color: "white", top: "60px", left: "160px", width: "36%" }}>
                    <h1 className="fs-1 fw-bolder mb-4">WAYSBUCKS</h1>
                    <p style={{ fontSize: "1.3rem" }}>Things are changing, but we're still here for you</p>
                    <p>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
                    <p>Let's Order...</p>
                </div>
            )}
        </Container>
    );
};