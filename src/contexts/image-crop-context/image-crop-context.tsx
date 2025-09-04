/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import getCroppedImg from "./utils";

// Define types for crop properties, zoom limits, and function types
interface Crop {
  x: number;
  y: number;
}

interface CroppedAreaPixels {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface ImageCropContextType {
  image: string | null;
  setImage: (value: string | null) => void;
  crop: Crop;
  setCrop: (value: Crop) => void;
  rotation: number;
  setRotation: (value: number) => void;
  zoom: number;
  setZoom: (value: number) => void;
  croppedAreaPixels: CroppedAreaPixels | null;
  setCroppedAreaPixels: (value: CroppedAreaPixels | null) => void;
  onCropComplete: (
    croppedArea: unknown,
    croppedAreaPixels: CroppedAreaPixels
  ) => void;
  getProcessedImage: () => Promise<File | undefined>;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleRotateCw: () => void;
  handleRotateAntiCw: () => void;
  resetStates: () => void;
  max_zoom: number;
  min_zoom: number;
  zoom_step: number;
  max_rotation: number;
  min_rotation: number;
  rotation_step: number;
}

const defaultCrop: Crop = { x: 0, y: 0 };
const defaultRotation = 0;
const defaultZoom = 1;
const defaultCroppedAreaPixels: CroppedAreaPixels | null = null;

// Define the context with default values
export const ImageCropContext = createContext<ImageCropContextType>(
  {} as ImageCropContextType
);

interface ImageCropProviderProps {
  children: ReactNode;
  max_zoom?: number;
  min_zoom?: number;
  zoom_step?: number;
  max_rotation?: number;
  min_rotation?: number;
  rotation_step?: number;
}

const ImageCropProvider: React.FC<ImageCropProviderProps> = ({
  children,
  max_zoom = 3,
  min_zoom = 1,
  zoom_step = 0.1,
  max_rotation = 360,
  min_rotation = 0,
  rotation_step = 5,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>(defaultCrop);
  const [rotation, setRotation] = useState<number>(defaultRotation);
  const [zoom, setZoom] = useState<number>(defaultZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(defaultCroppedAreaPixels);

  const onCropComplete = useCallback(
    (_: unknown, croppedAreaPixels: CroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleZoomIn = () => {
    if (zoom < max_zoom) {
      setZoom((prevZoom) => prevZoom + zoom_step * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > min_zoom) {
      setZoom((prevZoom) => prevZoom - zoom_step * 2);
    }
  };

  const handleRotateCw = () => {
    setRotation((prevRotation) => prevRotation + rotation_step);
  };

  const handleRotateAntiCw = () => {
    setRotation((prevRotation) => prevRotation - rotation_step);
  };

  const getProcessedImage = async (): Promise<File | undefined> => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );

      if (croppedImage) {
        const imageFile = new File(
          [croppedImage.file],
          `img-${Date.now()}.png`,
          { type: "image/png" }
        );

        return imageFile;
      }
    }
  };

  const resetStates = () => {
    setImage(null);
    setCrop(defaultCrop);
    setRotation(defaultRotation);
    setZoom(defaultZoom);
    setCroppedAreaPixels(defaultCroppedAreaPixels);
  };

  return (
    <ImageCropContext.Provider
      value={{
        image,
        setImage,
        crop,
        setCrop,
        rotation,
        setRotation,
        zoom,
        setZoom,
        croppedAreaPixels,
        setCroppedAreaPixels,
        onCropComplete,
        getProcessedImage,
        handleZoomIn,
        handleZoomOut,
        handleRotateCw,
        handleRotateAntiCw,
        resetStates,
        max_zoom,
        min_zoom,
        zoom_step,
        max_rotation,
        min_rotation,
        rotation_step,
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCropContext = (): ImageCropContextType =>
  useContext(ImageCropContext);

export default ImageCropProvider;
