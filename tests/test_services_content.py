from pathlib import Path
import unittest


SERVICES_APP = (
    Path(__file__).parents[1]
    / "app/components/desktop/apps/notes/notes-app.tsx"
)


class ServicesContentTests(unittest.TestCase):
    def test_requested_cloud_vps_and_n8n_offerings_are_listed(self) -> None:
        source = SERVICES_APP.read_text(encoding="utf-8")

        expected_offerings = {
            'name: "Cloud Services"': ["Cloud Architecture", "Deployment", "Monitoring"],
            'name: "VPS Setup & Management"': ["Linux", "Docker", "Security"],
            'name: "n8n Workflow Implementation"': ["n8n", "APIs", "Automation"],
        }

        for service_name, keywords in expected_offerings.items():
            with self.subTest(service=service_name):
                self.assertIn(service_name, source)
                for keyword in keywords:
                    self.assertIn(f'"{keyword}"', source)

    def test_core_offerings_are_merged_with_cms_services(self) -> None:
        source = SERVICES_APP.read_text(encoding="utf-8")

        self.assertIn("const mergeServices", source)
        self.assertIn("const serviceData = mergeServices(data)", source)
        self.assertIn("return [...CORE_SERVICES, ...cmsServices.filter", source)


if __name__ == "__main__":
    unittest.main()
