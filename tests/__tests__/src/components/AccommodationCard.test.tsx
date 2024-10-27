import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AccommodationCard from "../../../../src/components/AccommodationCard";
import EPropertyType from "../../../../src/model/EPropertyType";
import { useNavigation } from "@react-navigation/native";

jest.mock("aws-amplify", () => ({
  API: {
    graphql: jest.fn(),
  },
  Auth: {
    currentAuthenticatedUser: jest.fn(),
  },
  graphqlOperation: jest.fn(),
}));

// Mock useNavigation from React Navigation
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

describe("AccommodationCard", () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: jest.fn() });
  });

  it("renders correctly and matches snapshot", () => {
    const tree = renderer
      .create(
        <AccommodationCard
          id="1"
          title="Test Accommodation"
          propertyType={EPropertyType.Condo}
          price={1200}
          description="A nice place"
          rented={false}
          address={{ aptName: "Test Apt" }}
          availableDate="2024-12-01"
          images={[]}
          userId="123"
          createdAt="2024-01-01T00:00:00.000Z"
          User={{ name: "User Test" }}
          isSaved={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
