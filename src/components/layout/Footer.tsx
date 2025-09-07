const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2025 INDKAN Sweet n Snacks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer