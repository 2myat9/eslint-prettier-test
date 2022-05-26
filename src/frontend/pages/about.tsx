import React from "react"
import {useRouter} from "next/router";
import NavBar from "../components/navbar"
import {useUser} from "../common/queries";
import {statuses} from '../common/utils';
import {AiFillInfoCircle} from "react-icons/ai";
import {Button, Card, Container, Row, Spacer, Text} from "@nextui-org/react";
import ProfileButton from "../components/profile_button";
import LoadingScreen from "../components/loading_screen";

const Profile = () => {
    const router = useRouter()
    const {status, data: user} = useUser()

    if (status === statuses.loading && !user) {
        return <LoadingScreen/>
    }

    if (!user) {
        router.push("/login")
        return null
    }

    return (
        <>
            <NavBar selected="about"/>
            <Container sm>
                <Card>
                    <Card.Header>
                        <Row justify={"center"}>
                            <Text h1>This is the new About page</Text>
                        </Row>
                    </Card.Header>
                    <Button.Group vertical light>
                        <Spacer y={1}/>

                        {/*<ProfileButton disabled link_location={"/profile"} text={"Refer A Friend"}*/}
                        {/*               ButtonIcon={<AiFillHeart className="profile-icons"/>}/>*/}
                        {/*<Spacer y={1}/>*/}

                        <ProfileButton linkLocation={"/about/FAQs"} text={"FAQs"}
                                       buttonIcon={<AiFillInfoCircle className="profile-icons"/>} disabled={false}/>
                        <Spacer y={1}/>

                        {/*<ProfileButton disabled link_location={"/profile"} text={"Support"}*/}
                        {/*               ButtonIcon={<HiOutlineSupport className="profile-icons"/>}/>*/}
                        {/*<Spacer y={1}/>*/}

                    </Button.Group>
                </Card>
                <Spacer y={4}/>
            </Container>

        </>
    )
}


export default Profile;
