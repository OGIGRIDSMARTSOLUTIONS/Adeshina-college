interface StepPersonalProps {
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  dob: string;
  setDob: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
  stateOfOrigin: string;
  setStateOfOrigin: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
}

export function StepPersonal({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  dob,
  setDob,
  gender,
  setGender,
  stateOfOrigin,
  setStateOfOrigin,
  address,
  setAddress,
}: StepPersonalProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#001730] mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#001730] text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#001730] mb-1.5">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#001730] text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#001730] mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          placeholder="example@college.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#001730] text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#001730] mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+234 803 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#001730] text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#001730] mb-1.5">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#001730] text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#001730] mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#001730] text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">Use Day / Month / Year format</span>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#001730] mb-1.5">
            State of Origin
          </label>
          <input
            type="text"
            placeholder="e.g. Kwara State"
            value={stateOfOrigin}
            onChange={(e) => setStateOfOrigin(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#001730] text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#001730] mb-1.5">
          Permanent Residential Address
        </label>
        <input
          type="text"
          placeholder="Street name, City, State"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-[#001730] text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
        />
      </div>
    </div>
  );
}
