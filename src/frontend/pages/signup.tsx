import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {formatPhoneNumber, statuses} from "../common/utils";
import {useQueryClient} from "react-query";
import {useClaimAccount, useSignup} from "../common/mutations";
import {useUser} from "../common/queries";
import {
    Button,
    Card,
    Checkbox,
    Container,
    Image,
    Input,
    Link,
    Row,
    Spacer,
    Text
} from "@nextui-org/react";
import ErrorMessage from "../components/error_message";

function SignupForm() {
    const [rewardCode, setRewardCode] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [phone, setPhone] = useState<any>("");
    const [password, setPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState("false");
    const signupMutation = useSignup(handleErrors)
    const claimAccountMutation = useClaimAccount(handleErrors)
    const [errors, setErrors] = useState(Array);
    const {status: userStatus, data: user} = useUser()
    const queryClient = useQueryClient()
    const router = useRouter()

    useEffect(() => {
        if (router.query.phone) {
            setPhone(router.query.phone)
        }
        if (router.query.email) {
            setEmail(router.query.email)
        }
    }, [router.query])
    useEffect(() => {
        setErrors([])
    }, [phone, email, password])

    useEffect(() => {
        if (userStatus === statuses.success && user && user.verified) {
            router.push("/dashboard")
        }
    }, [user, router, userStatus])

    async function handleErrors(errorMessage: string) {
        if (errorMessage) {
            setErrors([errorMessage])
        } else {
            await queryClient.fetchQuery('user')
        }
    }

    const handleSubmit = async () => {

        if (!email || !phone || !password) {
            setErrors(["Please fill out the required fields: email, phone, password"])
            return
        } else if (phone.length < 10) {
            setErrors(["Phone number is too short"])
            return
        } else if (password.length < 8) {
            setErrors(["Password must be at least 8 characters"])
            return
        } else if (acceptedTerms != "true") {
            setErrors([" You must accept the terms and conditions before applying."])
        } else {
            const newPhone = phone.slice(0, 10)
            if (!Object.keys(router.query).length) {
                signupMutation.mutate({email: email, phone_num: newPhone, pw_hash: password, code: rewardCode})
            } else {
                claimAccountMutation.mutate({
                    email: email,
                    phone_num: newPhone,
                    pw_hash: password,
                    claim_code: router.query.claim_code
                })
            }
        }
    };

    return (
        <>
            <Container xs css={{paddingTop: "3%"}}>
                <Card shadow={false}>
                    <Card.Header css={{paddingTop: "20px"}}>
                        <Image
                            src={"/Logos/flycoin_logo_colored_round.png"}
                            width={100}
                            height={100}
                            alt={"Default Image"}
                        />
                    </Card.Header>
                    <Card.Body>
                        <Row justify={"center"}>
                            <Text h2>Registration</Text>
                        </Row>
                        <Row justify={"center"}>
                            <Text color={"gray"}>The future of loyalty is decentralized.</Text>
                        </Row>
                        <Spacer y={1.5}/>
                        <ErrorMessage errors={errors}/>
                        <Input
                            size={"xl"}
                            type={"text"}
                            value={formatPhoneNumber(phone)}
                            onChange={(e) => setPhone(e.target.value)}
                            autoComplete={"off"}
                            placeholder={"Phone Number"}/>
                        <Spacer y={1}/>
                        <Input
                            size={"xl"}
                            type={"text"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete={"off"}
                            placeholder={"Email"}/>
                        <Spacer y={1}/>
                        <Input
                            size={"xl"}
                            type={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"Password"}/>
                        <Spacer y={1}/>
                        <Input
                            size={"xl"}
                            type="text"
                            value={rewardCode}
                            onChange={(e) => setRewardCode(e.target.value)}
                            autoComplete="off"
                            placeholder="Reward Code (optional)"
                        />
                        <Spacer y={1}/>

                        <Row justify={"center"} align={"center"}>
                            <Text size={"1.2rem"}>Agree to
                                <Link
                                    href={"https://flycoin.org/terms-and-conditions/card"} icon>Terms and Conditions
                                </Link>
                            </Text>
                            <Spacer x={0.4}/>
                            <Checkbox css={{paddingTop: "3px"}} aria-label="Terms and Conditions" value={acceptedTerms}
                                      onChange={(status) => setAcceptedTerms("" + status)}/>
                        </Row>

                        <Spacer y={1}/>
                        <Button type={"submit"} size={"xl"} color={"gradient"} onClick={async () => {
                            await handleSubmit()
                        }}>Sign Up</Button>
                        <Spacer y={1}/>

                        <Row justify={"center"}>
                            <Link className={"signin-link"} href="/login">
                                Already have an account?&nbsp;<strong>Sign In</strong>
                            </Link>
                        </Row>
                        <Spacer y={1}/>
                    </Card.Body>
                </Card>
                <Spacer y={4}/>
            </Container>
        </>
    );
}

export default SignupForm;