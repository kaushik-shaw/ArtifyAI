import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);
  const [sourceImage, setSourceImage] = useState(false);
  const [targetImage, setTargetImage] = useState(false);
  const [sourceImageName, setSourceImageName] = useState("");
  const [targetImageName, setTargetImageName] = useState("");
  const [resultImage, setResultImage] = useState(null);

  const handleSourceImage = (image1) => {
    if (image1 && image1.type.startsWith("image/")) {
      setSourceImageName(image1.name);
      setSourceImage(image1);
      console.log("Source Image:", image1);
      toast.success(`Selected source image: ${image1.name}`);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleTargetImage = (image2) => {
    if (image2 && image2.type.startsWith("image/")) {
      setTargetImageName(image2.name);
      setTargetImage(image2);
      console.log("Target Image:", image2);
      toast.success(`Selected target image: ${image2.name}`);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });
      if (data.success) {
        setCredit(data.credits);
        console.log(data.credits);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const becomeImage = async () => {
    try {
      if (!isSignedIn) {
        toast.error("Please sign in to continue");
        return openSignIn();
      }
      if (!sourceImage || !targetImage) {
        toast.error("Please select both source and target images");
        return;
      }

      setResultImage(null);
      navigate("/result");

      const token = await getToken();

      const formData = new FormData();
      formData.append("sourceImage", sourceImage);
      formData.append("targetImage", targetImage);

      const { data } = await axios.post(
        `${backendUrl}/api/image/generate`,
        formData,
        {
          headers: {
            token
          },
        }
      );

      console.log("API response:", data);

      if (data.success) {
        setResultImage(data.resultImage);
        data.creditBalance && setCredit(data.creditBalance);
        toast.success("Image generated successfully!");
      } else {
        toast.error(data.message);
        if (data.creditBalance === 0) {
          toast.error("Please buy more credits to continue");
          navigate("/buy");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    credit,
    setCredit,
    loadCreditsData,
    backendUrl,
    sourceImage,
    setSourceImage,
    targetImage,
    setTargetImage,
    handleSourceImage,
    handleTargetImage,
    sourceImageName,
    targetImageName,
    becomeImage,
    resultImage,
    setResultImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
