import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);

  const branches = [
    { id: 1, name: "Филиал №1", employeeCount: 12, equipmentCount: 45 },
    { id: 2, name: "Филиал №2", employeeCount: 8, equipmentCount: 28 },
    { id: 3, name: "Филиал №3", employeeCount: 15, equipmentCount: 52 },
    { id: 4, name: "Филиал №4", employeeCount: 10, equipmentCount: 35 },
  ];

  const employees = [
    {
      id: 1,
      name: "Иванов Иван",
      email: "ivanov@company.com",
      branch: 1,
      equipment: ["Ноутбук HP", "Телефон iPhone"],
    },
    {
      id: 2,
      name: "Петрова Мария",
      email: "petrova@company.com",
      branch: 1,
      equipment: ["Ноутбук Dell", "Монитор Samsung"],
    },
    {
      id: 3,
      name: "Сидоров Петр",
      email: "sidorov@company.com",
      branch: 2,
      equipment: ["Ноутбук Lenovo"],
    },
    {
      id: 4,
      name: "Козлова Анна",
      email: "kozlova@company.com",
      branch: 3,
      equipment: ["Ноутбук MacBook", "Телефон Samsung", "Монитор LG"],
    },
  ];

  const equipmentTypes = [
    { name: "Ноутбук", term: "6 лет", icon: "Laptop", count: 45 },
    { name: "Телефон", term: "3 года", icon: "Smartphone", count: 28 },
    { name: "Монитор", term: "6 лет", icon: "Monitor", count: 32 },
    { name: "Принтер", term: "5 лет", icon: "Printer", count: 12 },
  ];

  const filteredEmployees = selectedBranch
    ? employees.filter((emp) => emp.branch === selectedBranch)
    : employees;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">
                Учёт оргтехники
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="FileText" size={16} className="mr-2" />
                Отчёты
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Филиалы */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Филиалы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((branch) => (
              <Card
                key={branch.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedBranch === branch.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:bg-slate-50"
                }`}
                onClick={() =>
                  setSelectedBranch(
                    selectedBranch === branch.id ? null : branch.id,
                  )
                }
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    {branch.name}
                    <Icon
                      name="Building"
                      size={16}
                      className="text-slate-500"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Сотрудники</span>
                      <Badge variant="secondary">{branch.employeeCount}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Техника</span>
                      <Badge variant="secondary">{branch.equipmentCount}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Сотрудники */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-900">
                Сотрудники{" "}
                {selectedBranch &&
                  `(${branches.find((b) => b.id === selectedBranch)?.name})`}
              </h2>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить
              </Button>
            </div>
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <Card
                  key={employee.id}
                  className="hover:shadow-sm transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {employee.name}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Icon name="Mail" size={14} className="mr-1" />
                          {employee.email}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        {branches.find((b) => b.id === employee.branch)?.name}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-700">
                        Выданная техника:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {employee.equipment.map((item, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Оборудование */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-900">
                Оборудование
              </h2>
              <Button size="sm" variant="outline">
                <Icon name="Package" size={16} className="mr-2" />
                Склад
              </Button>
            </div>
            <div className="space-y-4">
              {equipmentTypes.map((equipment, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Icon
                        name={equipment.icon as any}
                        size={20}
                        className="text-slate-600"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">
                        {equipment.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        Срок: {equipment.term}
                      </div>
                    </div>
                    <Badge variant="secondary">{equipment.count}</Badge>
                  </div>
                </Card>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Быстрые действия */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-slate-900">
                Быстрые действия
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Добавить сотрудника
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Icon name="PackagePlus" size={16} className="mr-2" />
                  Выдать технику
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Отчёт по филиалам
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
